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

function appendMultiline(text) {
  const lines = text.split('\n');
  lines.forEach(l => appendLine(l));
}

// Survey Form Interactive Logic
function initSurveyForm() {
  const form = document.getElementById('student-enroll-form');
  const resultPanel = document.getElementById('survey-result');
  const enrollBox = document.getElementById('enroll-box');
  const mainTitle = document.getElementById('survey-main-title');
  const mainDesc = document.getElementById('survey-main-desc');

  if (!form || !resultPanel) return;

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('student-name').value.trim();
    const discord = document.getElementById('student-discord').value.trim();
    const os = document.getElementById('student-os').value;
    
    // Disable submit button during "analysis"
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'กำลังเชื่อมต่อประสาทส่วนกลางตรวจสอบความพร้อม...';

    setTimeout(() => {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;

      // OS-Based Calculations
      let className = 'macOS Systems Specialist';
      let classDesc = 'ผู้เรียนรู้สายระบบนิเวศ Unix ที่มีเครื่องมือและ terminal พร้อมรัน agy/rtk แบบ Native';
      let classTag = '[ai-core:macos]';
      let classRec = 'การเตรียมตัวขั้นถัดไป: ตรวจสอบให้แน่ใจว่าได้เพิ่ม /root/ (ผ่าน SSH) ลงใน static profiles และตั้งค่า SSH config บน macOS ให้เรียบร้อยเพื่อความสะดวกในการควบคุมบอทคู่ GMGrub/Sonic แบบรีโมทผ่าน CLI';

      if (os === 'windows') {
        className = 'Windows Systems Specialist';
        classDesc = 'ผู้ใช้งานระบบปฏิบัติการ Windows ที่ต้องเตรียมพร้อมการรันข้ามระบบ';
        classTag = '[ai-core:windows]';
        classRec = 'การเตรียมตัวขั้นถัดไป: เนื่องจาก command syntax ของ bash shell มีข้อต่างจาก cmd.exe แนะนำอย่างยิ่งให้เปิดใช้ WSL2 (Windows Subsystem for Linux) หรือรันผ่าน Git Bash เสมอ เพื่อลด regression ในการรันคำสั่ง rtk';
      } else if (os === 'linux') {
        className = 'Linux Arch-Mage Operations';
        classDesc = 'วิศวกรสายระบบที่เป็นหนึ่งเดียวกับสภาพแวดล้อม Docker-first deployment';
        classTag = '[ai-core:linux]';
        classRec = 'การเตรียมตัวขั้นถัดไป: สภาพแวดล้อมของท่านมีความสมบูรณ์สูงสุด แนะนำให้ตรวจสอบ keyring permissions และ daemon status ของ PM2 หรือ systemd เพื่อรองรับการสถาปนา process บอทคู่ในกิจกรรมจริง';
      } else if (os === 'mobile') {
        className = 'Hermes Mobile Operator';
        classDesc = 'ผู้เชี่ยวชาญการ Bootstrap และดูแลระบบบอทพกพาในสมาร์ทโฟน';
        classTag = '[ai-core:mobile]';
        classRec = 'การเตรียมตัวขั้นถัดไป: ติดตั้ง Android Termux และขอรับ Hermes bootstrap package เพื่อใช้รันและล็อค RAM (oom_score_adj -1000) ของเอเจนต์ GMGrub/Sonic ป้องกัน LMK ปิดการออนไลน์';
      }

      // Update DOM Result Panel
      document.getElementById('assigned-class-title').innerText = className;
      document.getElementById('assigned-class-desc').innerText = classDesc;
      document.getElementById('result-score').innerText = os.toUpperCase();
      document.getElementById('result-tag').innerText = classTag;
      document.getElementById('result-recommendation').innerText = classRec;

      // Generate JSON Token Code
      const localTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
      const jsonToken = {
        survey_type: "pre_event_readiness_assessment",
        student_identity: {
          alias: name,
          discord_user: discord
        },
        setup_assessment: {
          target_os: os,
          tailscale_connected: true,
          terminal_ready: true,
          rule6_aligned: true,
          patterns_aligned: true
        },
        assigned_evaluation: {
          calculated_class: className,
          federation_tag: classTag,
          evaluation_time: localTime + " (GMT+7)"
        },
        signature_auth: btoa(`BWO-SCHOOL-OS-${name}-${os}`).slice(0, 32)
      };

      const exportTextarea = document.getElementById('export-json-code');
      if (exportTextarea) {
        exportTextarea.value = JSON.stringify(jsonToken, null, 2);
      }

      // Switch views
      form.style.display = 'none';
      resultPanel.style.display = 'block';
      
      mainTitle.innerText = 'ผลการประเมินการเตรียมตัว';
      mainDesc.innerText = 'สภากองยานได้บันทึกเช็คลิสต์และข้อมูลจัดตั้งของท่านลงทะเบียนเรียนเรียบร้อยแล้ว';
      
      // Scroll to enroll box header smoothly
      enrollBox.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  });

  // Handle Copy Token
  const copyBtn = document.getElementById('btn-copy-token');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textarea = document.getElementById('export-json-code');
      if (textarea) {
        textarea.select();
        document.execCommand('copy');
        copyBtn.innerText = '✓ คัดลอกสำเร็จ!';
        copyBtn.style.background = '#10B981';
        copyBtn.style.color = '#fff';
        setTimeout(() => {
          copyBtn.innerText = 'คัดลอก Token ไปยังคลิปบอร์ด';
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      }
    });
  }

  // Handle Redo Survey
  const redoBtn = document.getElementById('btn-redo-survey');
  if (redoBtn) {
    redoBtn.addEventListener('click', () => {
      form.reset();
      resultPanel.style.display = 'none';
      form.style.display = 'flex';
      
      mainTitle.innerText = 'แบบประเมินและแบบสอบถามก่อนเริ่มกิจกรรม';
      mainDesc.innerText = 'กรุณากรอกข้อมูลของคุณให้ครบถ้วนเพื่อวิเคราะห์แนวทางเตรียมความพร้อมและลงทะเบียนการเข้าเรียนในวันที่ 8 ก.ค. นี้';
      
      enrollBox.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Start animations on load
window.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initActivityChart();
  initSurveyForm();
});
