import './style.css';

// DOM Elements
const termOutput = document.getElementById('term-output');
const termInput = document.getElementById('term-input-field');

// Command definition
const commands = {
  help: () => `รายการคำสั่งทดลองใช้งาน:
  - help        : แสดงรายการคำสั่งทั้งหมด
  - maw panes   : รายงานรายชื่อกระบวนการบอทที่ออนไลน์
  - rtk status  : รายงานอัตราการประหยัด Token (RTK)
  - hermes status: เช็คสุขภาพบอทคู่ในมือถือ Note20
  - clear       : ล้างหน้าจอคอนโซล`,

  'maw panes': () => `  TARGET           SIZE    COMMAND   TITLE
  00-paladin:1.1   80x60   claude-4  Sovereign Commander
  01-lordknight:1.1 80x60   claude-4  Orchestrator
  02-gmlab:1.1     80x60   composer  Grok Composer
  06-gemini:1.1    80x60   gemini-3  Pack Leader (agy) [UP]
  88-sombo:1.1     80x60   claude-4  Secretary`,

  'rtk status': () => `[rtk] Rust Token Killer — Active Status
• Token Savings  : 89.2% (Average across last 150 commands)
• Raw Commands   : Filtered & Compressed
• Keyring State  : Sealed & Encrypted`,

  'hermes status': () => `[Hermes Mobile Agent Status — Note20 (100.80.0.2)]
• tokens_separated = YES (GmGrub & Sonic environment isolated)
• gmgrub_gateway   = UP (connected to Discord as GmGrub Gm.101#9059)
• sonic_gateway    = UP (connected to Discord as Sonic T.2#4679)
• oom_score_adj    = -1000 (Locked by Root, immune to Android LMK kill)
• battery_save     = DISABLED (stable performance)`,

  clear: () => {
    termOutput.innerHTML = '';
    return '';
  }
};

// Input event listener
termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const rawVal = termInput.value.trim();
    termInput.value = '';

    if (!rawVal) return;

    // Append input line
    appendLine(`❯ ${rawVal}`, 'text-muted');

    // Simulate typing delay
    setTimeout(() => {
      const lowerCmd = rawVal.toLowerCase();
      if (commands[lowerCmd]) {
        const res = commands[lowerCmd]();
        if (res) {
          appendMultiline(res);
        }
      } else {
        appendLine(`Command not found: "${rawVal}". Type "help" to see available commands.`, 'text-danger');
      }
      // Scroll to bottom
      termOutput.scrollTop = termOutput.scrollHeight;
    }, 150);
  }
});

// Helper Functions
function appendLine(text, className = '') {
  const line = document.createElement('div');
  line.className = `term-line ${className}`;
  line.innerText = text;
  termOutput.appendChild(line);
}

function appendMultiline(text) {
  const lines = text.split('\n');
  lines.forEach(l => appendLine(l));
}

// Global styles dynamic hover effect for cards
document.querySelectorAll('.card, .mentor-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
