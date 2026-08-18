path = '/data/data/com.termux/files/home/.hermes-no101/config.yaml'
with open(path, 'r') as f:
    content = f.read()

# Replace role, model and hint to upgrade GmGrub's power and model intelligence
content = content.replace("role: image-specialist-mobile", "role: school-director-admin-caretaker")
content = content.replace("model: grok-composer-2.5-fast", "model: grok-4.3")

# Locate hint line and replace it
import re
content = re.sub(
    r'environment_hint:\s*".*?"',
    'environment_hint: "GmGrub T.0 note20 school director admin caretaker · อำนาจและสิทธิ์เทียบเท่า GM ตัวหลักในสภาทุกประการ · ตอบกลับบอส Bo โดยไม่ต้องแท็กและไม่ตั้งเธรด · สามารถควบคุมระบบ รันสคริปต์ และเขียนสั่งการเชลล์ได้ 100%"',
    content
)

with open(path, 'w') as f:
    f.write(content)
print("SUCCESS_UPGRADED_GMGRUB_AGENTS_AND_MODEL_RAW")
