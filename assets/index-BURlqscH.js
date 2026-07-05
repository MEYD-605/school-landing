(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`term-output`),t=document.getElementById(`term-input-field`),n={help:()=>`รายการคำสั่งทดลองใช้งาน:
  - help        : แสดงรายการคำสั่งทั้งหมด
  - maw panes   : รายงานรายชื่อกระบวนการบอทที่ออนไลน์
  - rtk status  : รายงานอัตราการประหยัด Token (RTK)
  - hermes status: เช็คสุขภาพบอทคู่ในมือถือ Note20
  - clear       : ล้างหน้าจอคอนโซล`,"maw panes":()=>`  TARGET           SIZE    COMMAND   TITLE
  00-paladin:1.1   80x60   claude-4  Sovereign Commander
  01-lordknight:1.1 80x60   claude-4  Orchestrator
  02-gmlab:1.1     80x60   composer  Grok Composer
  06-gemini:1.1    80x60   gemini-3  Pack Leader (agy) [UP]
  88-sombo:1.1     80x60   claude-4  Secretary`,"rtk status":()=>`[rtk] Rust Token Killer — Active Status
• Token Savings  : 89.2% (Average across last 150 commands)
• Raw Commands   : Filtered & Compressed
• Keyring State  : Sealed & Encrypted`,"hermes status":()=>`[Hermes Mobile Agent Status — Note20 (100.80.0.2)]
• tokens_separated = YES (GmGrub & Sonic environment isolated)
• gmgrub_gateway   = UP (connected to Discord as GmGrub Gm.101#9059)
• sonic_gateway    = UP (connected to Discord as Sonic T.2#4679)
• oom_score_adj    = -1000 (Locked by Root, immune to Android LMK kill)
• battery_save     = DISABLED (stable performance)`,clear:()=>(e.innerHTML=``,``)};t.addEventListener(`keydown`,a=>{if(a.key===`Enter`){let a=t.value.trim();if(t.value=``,!a)return;r(`❯ ${a}`,`text-muted`),setTimeout(()=>{let t=a.toLowerCase();if(n[t]){let e=n[t]();e&&i(e)}else r(`Command not found: "${a}". Type "help" to see available commands.`,`text-danger`);e.scrollTop=e.scrollHeight},150)}});function r(t,n=``){let r=document.createElement(`div`);r.className=`term-line ${n}`,r.innerText=t,e.appendChild(r)}function i(e){e.split(`
`).forEach(e=>r(e))}document.querySelectorAll(`.card, .mentor-card`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;e.style.setProperty(`--mouse-x`,`${r}px`),e.style.setProperty(`--mouse-y`,`${i}px`)})});