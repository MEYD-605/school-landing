path = '/data/data/com.termux/files/home/bin/school-gateways-tmux'
with open(path, 'r') as f:
    lines = f.readlines()

# Hardcoded line 16 update to load the .env environment variables file before exec hermes
lines[15] = '    "proot-distro login debian -- bash -lc \\"export HERMES_HOME=$home PATH=/root/hermes-venv/bin:\\\\\\$PATH; [ -f \\\\\\\"\\$HERMES_HOME/discord-state/.env\\\\\\\" ] && . \\\\\\\"\\$HERMES_HOME/discord-state/.env\\\\\\\"; exec $HERMES_BIN gateway run --replace\\\""\n'

with open(path, 'w') as f:
    f.writelines(lines)
print("SUCCESS_HARDCODED_LINE_16")
