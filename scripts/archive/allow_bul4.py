import os
new_user = "1204772059163529237"

# 1. Update .env for Sonic to allow bul4_101 as authorized user
env_path = os.path.expanduser('~/.hermes-sonic-t2/discord-state/.env')
if os.path.exists(env_path):
    with open(env_path, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    updated = False
    for line in lines:
        if line.startswith("DISCORD_ALLOWED_USERS="):
            current = line.split("=", 1)[1].strip()
            users = [u.strip() for u in current.split(",") if u.strip()]
            if new_user not in users:
                users.append(new_user)
            line = f"DISCORD_ALLOWED_USERS={','.join(users)}\n"
            updated = True
        new_lines.append(line)
    
    if not updated:
        new_lines.append(f"\nDISCORD_ALLOWED_USERS=910909378876571658,{new_user}\n")
        
    with open(env_path, 'w') as f:
        f.writelines(new_lines)
    print("UPDATED SONIC ENV ALLOWED USERS")
