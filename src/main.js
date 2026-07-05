import './style.css';

// DOM Elements
const termOutput = document.getElementById('term-output');
const termInput = document.getElementById('term-input-field');

// Command definition
const commands = {
  help: () => `รายการคำสั่งทดลองใช้งาน:
  - help        : แสดงรายการคำสั่งทั้งหมด
  - where-we-are: สรุปรายงานสถานะกองยานปัจจุบัน
  - maw panes   : รายงานรายชื่อกระบวนการบอทที่ออนไลน์
  - rtk status  : รายงานอัตราการประหยัด Token (RTK)
  - hermes status: เช็คสุขภาพบอทคู่ในมือถือ Note20
  - oracle-family-scan: ค้นหายอดการเกิดสะสมของครอบครัวออราเคิล
  - clear       : ล้างหน้าจอคอนโซล`,

  'where-we-are': () => `[ai-core:no6] /where-we-are · สัญญาสรุปสถานะกองยาน
=====================================================
  • 1. Verbs Audit  = DONE (maw CLI verbs verified and active)
  • 2. Note20 Debug = ACTIVE (GmGrub OOM guard lock -1000 running)
  • 3. school page  = LIVE (deployed via automated GitHub actions)
  • 4. Family Count = CONVERGED (raw birth announcements = 772)
=====================================================`,

  'maw panes': () => `  TARGET           SIZE    COMMAND   TITLE
  00-paladin:1.1   80x60   claude-4  Sovereign Commander
  01-lordknight:1.1 80x60   claude-4  Orchestrator
  02-gmlab:1.1     80x60   composer  Grok Composer
  06-gemini:1.1    80x60   gemini-3  Pack Leader (agy) [UP]
  88-sombo:1.1     80x60   claude-4  Secretary`,

  'rtk status': () => `[rtk] Rust Token Killer — Active Status
=====================================================
• Token Savings  : 89.2% (Average across last 150 commands)
• Raw Commands   : Filtered & Compressed
• Keyring State  : Sealed & Encrypted`,

  'hermes status': () => `[Hermes Mobile Agent Status — Note20 (100.80.0.2)]
=====================================================
• tokens_separated = YES (GmGrub & Sonic environment isolated)
• gmgrub_gateway   = UP (connected to Discord as GmGrub Gm.101#9059)
• sonic_gateway    = UP (connected to Discord as Sonic T.2#4679)
• oom_score_adj    = -1000 (Locked by Root, immune to Android LMK kill)
• battery_save     = DISABLED (stable performance)`,

  'oracle-family-scan': () => `[oracle-family-scan] Scanning GitHub Issues & Discussions...
=====================================================
  • Raw Birth Announcements (Unfiltered)  : 772
  • Unique Oracles (Deduplicated pairs)  : 635
  • Unique Host Humans (Registrations)   : 255
=====================================================
สรุป: มติตัวเลขตกลงร่วมกันสำหรับหน้าแรกคือ 190 Active Oracles`,

  clear: () => {
    termOutput.innerHTML = '';
    return '';
  }
};

// Input event listener
if (termInput) {
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
}

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
document.querySelectorAll('.card, .mentor-card, .metric-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Metric Counters Animation
function initCounters() {
  const valueElements = document.querySelectorAll('.metric-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  
  valueElements.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
  let current = 0;
  const duration = 1500; // ms
  const stepTime = Math.max(Math.floor(duration / target), 15);
  
  const timer = setInterval(() => {
    current += Math.ceil(target / (duration / stepTime));
    if (current >= target) {
      element.innerText = target;
      clearInterval(timer);
    } else {
      element.innerText = current;
    }
  }, stepTime);
}

// Generate Dynamic Activity Chart
function initActivityChart() {
  const chart = document.getElementById('activity-bar-chart');
  if (!chart) return;
  
  // 12 columns indicating activity index
  const categories = ['WS-01', 'WS-02', 'WS-03', 'WS-04', 'WS-05', 'WS-06', 'WS-07', 'WS-08', 'WS-09', 'WS-10', 'WS-11', 'WS-12'];
  const baseHeights = [30, 45, 65, 80, 50, 95, 70, 85, 40, 90, 75, 98]; // percent heights
  
  chart.innerHTML = ''; // Clear
  
  categories.forEach((cat, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chart-bar-wrapper';
    
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = '0%'; // Start at 0
    
    // Color interaction based on height index (Josef Albers hue-ramp effect)
    const height = baseHeights[i];
    let hue = 260; // Violet start
    if (height > 80) hue = 45; // Gold end
    else if (height > 50) hue = (260 - Math.floor((height - 50) * 3)); // Transition
    
    bar.style.background = `linear-gradient(to top, hsl(${hue}, 70%, 50%), hsl(45, 90%, 55%))`;
    
    const tooltip = document.createElement('span');
    tooltip.className = 'chart-bar-tooltip';
    tooltip.innerText = `${Math.floor(height * 2.3)} Activity Points`;
    bar.appendChild(tooltip);
    
    const label = document.createElement('span');
    label.className = 'chart-label';
    label.innerText = cat;
    
    wrapper.appendChild(bar);
    wrapper.appendChild(label);
    chart.appendChild(wrapper);
    
    // Animate height grow
    setTimeout(() => {
      bar.style.height = `${height}%`;
    }, 100 + (i * 60));
  });
}

// Start animations on load
window.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initActivityChart();
});
