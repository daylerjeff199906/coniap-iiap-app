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

    // Handle startContent in Button
    const buttonRegexWithStart = /<Button([\s\S]*?)startContent={([\s\S]*?)}([\s\S]*?)>([\s\S]*?)<\/Button>/g;
    content = content.replace(buttonRegexWithStart, (match, attrs1, startContent, attrs2, children) => {
        let newAttrs = (attrs1 + attrs2).replace(/\s+/g, ' ').trim();
        return `<Button ${newAttrs}>\n  ${startContent.trim()}\n  ${children.trim()}\n</Button>`;
    });

    // Handle endContent in Button
    const buttonRegexWithEnd = /<Button([\s\S]*?)endContent={([\s\S]*?)}([\s\S]*?)>([\s\S]*?)<\/Button>/g;
    content = content.replace(buttonRegexWithEnd, (match, attrs1, endContent, attrs2, children) => {
        let newAttrs = (attrs1 + attrs2).replace(/\s+/g, ' ').trim();
        return `<Button ${newAttrs}>\n  ${children.trim()}\n  ${endContent.trim()}\n</Button>`;
    });

    // Final cleanup of extra variants or other props that might have been duplicated
    // Actually just run it.

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed Button contents in ${filePath}`);
    }
});
