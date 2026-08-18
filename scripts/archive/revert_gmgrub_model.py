path = '/data/data/com.termux/files/home/.hermes-no101/config.yaml'
with open(path, 'r') as f:
    content = f.read()

# Revert model back to grok-composer-2.5-fast as per Bo's request
content = content.replace("model: grok-4.3", "model: grok-composer-2.5-fast")

with open(path, 'w') as f:
    f.write(content)
print("REVERTED_GMGRUB_MODEL_SUCCESSFULLY")
