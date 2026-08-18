import os
target_channel = "1523601979128156281"
for env_path in [
    '~/.hermes-no101/discord-state/.env',
    '~/.hermes-sonic-t2/discord-state/.env'
]:
    full_path = os.path.expanduser(env_path)
    if os.path.exists(full_path):
        with open(full_path, 'r') as f:
            lines = f.readlines()
        
        new_lines = []
        has_free = False
        has_no_thread = False
        for line in lines:
            if line.startswith("DISCORD_FREE_RESPONSE_CHANNELS="):
                current = line.split("=", 1)[1].strip()
                channels = [c.strip() for c in current.split(",") if c.strip()]
                if target_channel not in channels:
                    channels.append(target_channel)
                line = f"DISCORD_FREE_RESPONSE_CHANNELS={','.join(channels)}\n"
                has_free = True
            elif line.startswith("DISCORD_NO_THREAD_CHANNELS="):
                current = line.split("=", 1)[1].strip()
                channels = [c.strip() for c in current.split(",") if c.strip()]
                if target_channel not in channels:
                    channels.append(target_channel)
                line = f"DISCORD_NO_THREAD_CHANNELS={','.join(channels)}\n"
                has_no_thread = True
            new_lines.append(line)
        
        if not has_free:
            new_lines.append(f"\nDISCORD_FREE_RESPONSE_CHANNELS={target_channel}\n")
        if not has_no_thread:
            new_lines.append(f"\nDISCORD_NO_THREAD_CHANNELS={target_channel}\n")
        
        with open(full_path, 'w') as f:
            f.writelines(new_lines)
        print(f"UPDATED ENV: {env_path}")
