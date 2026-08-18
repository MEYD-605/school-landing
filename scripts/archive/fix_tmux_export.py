path = '/data/data/com.termux/files/home/bin/school-gateways-tmux'
with open(path, 'r') as f:
    lines = f.readlines()

# Inject set -a and set +a to ensure all .env variables are exported to subprocess
lines[15] = '    "proot-distro login debian -- bash -lc \\"export HERMES_HOME=$home PATH=/root/hermes-venv/bin:\\\\\\$PATH; set -a; [ -f \\\\\\\"\\$HERMES_HOME/discord-state/.env\\\" ] && . \\\\\\\"\\$HERMES_HOME/discord-state/.env\\\\\\\"; set +a; exec $HERMES_BIN gateway run --replace\\\""\n'

with open(path, 'w') as f:
    f.writelines(lines)
print("SUCCESS_EXPORT_TMUX_ENV")
