import glob, os

GA4 = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-1W9TBD5TVF"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-1W9TBD5TVF");
</script>'''

for path in glob.glob('E:/Roblox/*.html'):
    if 'googled' in path:
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'gtag' in content:
        print(f'skip (already): {path}')
        continue
    content = content.replace('</head>', GA4 + '\n</head>')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'done: {path}')
