import sys, os

if len(sys.argv) < 2:
    print("USAGE: python3 patch_adapter.py <path_to_adapter.py>")
    sys.exit(1)

path = os.path.expanduser(sys.argv[1])
if os.path.exists(path):
    with open(path, 'r') as f:
        content = f.read()
    
    old_line = '            if require_mention and not is_free_channel and not in_bot_thread:'
    new_line = '''            # Skip mention check if sender is Bo, or message is DM from allowed user, or contains @all agent
            is_bo = str(message.author.id) == "910909378876571658"
            is_allowed = str(message.author.id) in self._allowed_user_ids
            is_dm_channel = isinstance(message.channel, discord.DMChannel)
            has_all_agent_call = any(x in (message.content or "").lower() for x in ["@all agent", "@agent", "@all agents"])
            if require_mention and not is_free_channel and not in_bot_thread and not is_bo and not has_all_agent_call and not (is_allowed and is_dm_channel):'''
            
    previous_patch = '''            # Skip mention check if sender is Bo or message contains @all agent / @agent
            is_bo = str(message.author.id) == "910909378876571658"
            has_all_agent_call = any(x in (message.content or "").lower() for x in ["@all agent", "@agent", "@all agents"])
            if require_mention and not is_free_channel and not in_bot_thread and not is_bo and not has_all_agent_call:'''

    if previous_patch in content:
        content = content.replace(previous_patch, new_line)
        with open(path, 'w') as f:
            f.write(content)
        print(f"UPDATED_PATCH_SUCCESSFULLY: {path}")
    elif old_line in content:
        content = content.replace(old_line, new_line)
        with open(path, 'w') as f:
            f.write(content)
        print(f"PATCHED_SUCCESSFULLY: {path}")
    else:
        print(f"ALREADY_PATCHED_OR_OLD_LINE_NOT_FOUND: {path}")
else:
    print(f"ADAPTER_FILE_NOT_FOUND: {path}")
