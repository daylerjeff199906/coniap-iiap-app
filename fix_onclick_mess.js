const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

walk('src', (filePath) => {
    if (!filePath.endsWith('.tsx')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix the very specific broken pattern:
    // <Button ... onClick={() => <Icon ... /> setIsOpen(true)} > ... </Button>

    // We search for a button that has an onClick that contains a JSX element.
    const brokenButtonRegex = /<Button([\s\S]*?)onClick={() =>\s*<([A-Z][a-zA-Z0-9]*)\s+size={(\d+)}\s*\/>\s*([\s\S]*?)}\s*>([\s\S]*?)<\/Button>/g;

    content = content.replace(brokenButtonRegex, (match, attrs, iconName, iconSize, body, children) => {
        return `<Button ${attrs.trim()} onClick={() => ${body.trim()}}>\n  <${iconName} size={${iconSize}} />\n  ${children.trim()}\n</Button>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Repaired onClick mess in ${filePath}`);
    }
});
