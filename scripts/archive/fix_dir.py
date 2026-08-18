import json, os
new_channel = {
    "id": "1523601979128156281",
    "name": "ฝ่ายปกครอง",
    "guild": "Grok Bkk X Maw Rs",
    "type": "channel"
}
for path in [
    '~/.hermes-no101/channel_directory.json',
    '~/.hermes-sonic-t2/channel_directory.json',
    '~/.hermes-no101/gateway/discord_nonconversational_messages.json',
    '~/.hermes-sonic-t2/gateway/discord_nonconversational_messages.json'
]:
    full_path = os.path.expanduser(path)
    if os.path.exists(full_path):
        with open(full_path, 'r') as f:
            data = json.load(f)
        if 'channel_directory' in path:
            if not any(c['id'] == new_channel['id'] for c in data['platforms']['discord']):
                data['platforms']['discord'].append(new_channel)
                with open(full_path, 'w') as f:
                    json.dump(data, f, indent=2)
        else:
            if new_channel['id'] not in data:
                data.append(new_channel['id'])
                with open(full_path, 'w') as f:
                    json.dump(data, f)
        print(f"UPDATED JSON: {path}")
