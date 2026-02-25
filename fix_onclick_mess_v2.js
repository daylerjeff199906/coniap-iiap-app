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

    // Pattern to look for:
    // <Button ... onClick={() =>
    //   <Icon ... />
    //   someLogic()}
    // >

    // We need to be careful with the attributes.
    // The previous script caused: <Button attrs onClick={() => <Icon /> body} > children </Button>

    // Matches the absolute mess.
    const regex = /<Button([\s\S]*?)onClick={() =>\s*<([A-Z][a-zA-Z0-9]*)\s+size={(\d+)}\s*\/>\s*([\s\S]*?)}\s*>([\s\S]*?)<\/Button>/g;

    content = content.replace(regex, (match, attrs, iconName, iconSize, body, children) => {
        console.log(`Matching broken button in ${filePath}`);
        return `<Button ${attrs.trim()} onClick={() => ${body.trim()}}>\n  <${iconName} size={${iconSize}} />\n  ${children.trim()}\n</Button>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
    }
});
