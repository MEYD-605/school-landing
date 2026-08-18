path = '/data/data/com.termux/files/home/bin/sonic-t2-gateway-restart'
with open(path, 'r') as f:
    content = f.read()
content = content.replace('/root/.hermes-sonic-t2', '/data/data/com.termux/files/home/.hermes-sonic-t2')
content = content.replace('export HERMES_HOME=$HH PATH=/root/hermes-venv/bin:$TERMUX_HOME/bin;', 'export HERMES_HOME=/data/data/com.termux/files/home/.hermes-sonic-t2 PATH=/root/hermes-venv/bin:/data/data/com.termux/files/home/bin:/usr/bin:/bin:/usr/sbin:/sbin;')
with open(path, 'w') as f:
    f.write(content)
print("SUCCESS_RESTORE")
