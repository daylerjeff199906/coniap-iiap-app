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

    // Fix the mess: <Button attrs><IconName size={N } extraAttrs > Children </Button>
    // Note the trailing } and the fact that extraAttrs should have been on the Button.
    const complexBrokenRegex = /<Button([\s\S]*?)>\s*<([A-Z][a-zA-Z0-9]*)\s+size={(\d+)\s*}([\s\S]*?)>\s*([\s\S]*?)<\/Button>/g;

    content = content.replace(complexBrokenRegex, (match, btnAttrs, iconName, iconSize, extraAttrs, children) => {
        let cleanedBtnAttrs = (btnAttrs + ' ' + extraAttrs).replace(/\s+/g, ' ').trim();
        return `<Button ${cleanedBtnAttrs}>\n  <${iconName} size={${iconSize}} />\n  ${children.trim()}\n</Button>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Deeply repaired Button in ${filePath}`);
    }
});
