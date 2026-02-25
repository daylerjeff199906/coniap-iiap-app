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

    // Pattern: <Button ... /> [\s\S]*? </Button>
    // This was caused by an error in a previous script.
    const brokenButtonRegex = /<Button([\s\S]*?)\/>([\s\S]*?)<\/Button>/g;

    content = content.replace(brokenButtonRegex, (match, attrs, children) => {
        return `<Button ${attrs.trim()}>${children.trim()}</Button>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Repaired broken Button in ${filePath}`);
    }
});
