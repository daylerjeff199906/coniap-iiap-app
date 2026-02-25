import os
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        attrs = match.group(1).strip()
        icon_name = match.group(2).strip()
        icon_size = match.group(3).strip()
        body = match.group(4).strip()
        children = match.group(5).strip()
        
        # Avoid f-string braces issues
        res = '<Button ' + attrs + ' onClick={() => ' + body + '} className="rounded-sm gap-2">\n'
        res += '  <' + icon_name + ' size={' + icon_size + '} />\n'
        res += '  ' + children + '\n'
        res += '</Button>'
        return res

    pattern = re.compile(r'<Button([\s\S]*?)onClick={\(\) =>\s*<([A-Z][a-zA-Z0-9]*)\s+size={(\d+)}\s*/>\s*([\s\S]*?)}\s*>([\s\S]*?)<\/Button>', re.MULTILINE)
    
    new_content, count = pattern.subn(replacer, content)
    
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {count} buttons in {file_path}")

def walk(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                fix_file(os.path.join(root, file))

if __name__ == "__main__":
    walk('src')
