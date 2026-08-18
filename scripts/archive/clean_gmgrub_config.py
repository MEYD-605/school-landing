path = '/data/data/com.termux/files/home/.hermes-no101/config.yaml'
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if line.startswith('discord:'):
        skip = True
        continue
    if skip:
        if line.strip() == '':
            new_lines.append(line)
            continue
        if line.startswith(' ') or line.startswith('\t'):
            continue
        else:
            skip = False
    new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)
print("SUCCESS_CLEANED_YAML_WITHOUT_MODULE")
