# 💻 MCP Server Code Comparison: stdio vs. SSE (TypeScript & Python)

นี่คือการเปรียบเทียบโค้ดโครงสร้างเริ่มต้นในการเปิดใช้งาน MCP Server ในรูปแบบต่างกันขนานคู่กัน (Side-by-Side):

---

## 1. Node.js / TypeScript SDK Comparison

### 📂 stdio Server (Subprocess)
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "my-local-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// รันผ่าน Standard Input/Output ของกระบวนการ
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Stdio MCP Server running...");
```

### 🌐 SSE Server (HTTP over Network)
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";

const server = new Server(
  { name: "my-remote-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const app = express();
let transport: SSEServerTransport;

// GET endpoint สำหรับสร้าง SSE Connection สตรีมหา Client
app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

// POST endpoint สำหรับรับคำขอจาก Client ส่งหา Server
app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(3000, () => {
  console.log("SSE MCP Server running on port 3000");
});
```

---

## 2. Python SDK Comparison

### 📂 stdio Server
```python
from mcp.server.fastmcp import FastMCP

# FastMCP รัน stdio เป็นค่าเริ่มต้น (Default)
mcp = FastMCP("my-local-server")

@mcp.tool()
def add(x: int, y: int) -> int:
    return x + y

if __name__ == "__main__":
    mcp.run() # สตาร์ท stdio server ทันที
```

### 🌐 SSE Server
```python
from mcp.server.fastmcp import FastMCP
from mcp.server.sse import SseServerTransport
from starlette.applications import Starlette
from starlette.routing import Route

mcp = FastMCP("my-remote-server")
sse = SseServerTransport("/messages")

async def handle_sse(request):
    # เชื่อมต่อ SSE connection ขาออก
    async with sse.connect_sse(
        request.scope, 
        request.receive, 
        request._send_impl
    ) as queue:
        await mcp.handle_request(queue)

app = Starlette(routes=[
    # GET endpoint สำหรับเปิด SSE stream
    Route("/sse", endpoint=handle_sse, methods=["GET"]),
    # POST endpoint สำหรับรับคำขอเข้ามา
    Route("/messages", endpoint=sse.handle_post_message, methods=["POST"])
])
```

---

## 3. ความแตกต่างและโฟลว์การเชื่อมต่อ (Flow of Control)

1. **การควบคุมการไหล (Control Flow):**
   * **stdio:** วิ่งสตรีมตรงผ่านช่องทางหลักของกระบวนการ OS เสมอ ทำงานแบบ synchronous ใน thread ท้องถิ่นของ Process นั้นๆ
   * **SSE:** วิ่งผ่านพอร์ต Network โดย Client ยิง GET `/sse` เข้ามาก่อนเพื่อเปิดสตรีมขาเข้า จากนั้นส่งคำสั่งอื่นๆ ผ่าน POST `/messages` แบบ Asynchronous ซึ่ง Server จะหา Endpoint ที่แมปส่งข้อมูลสตรีมกลับไปที่ Session ท่อนั้น
2. **การจัดการสเปซข้อมูล:**
   * **stdio:** ใช้ `console.error` ในการ Logging เสมอ เนื่องจาก `console.log` จะทำการพ่นผลลัพธ์ลงสู่ `stdout` ซึ่งจะปะปนกับข้อความ JSON-RPC จนสตรีมพัง
   * **SSE:** สามารถใช้ `console.log` ได้ตามปกติ เนื่องจากสตรีมข้อมูลแยกออกจากคอนโซลของ Server โดยสิ้นเชิง
