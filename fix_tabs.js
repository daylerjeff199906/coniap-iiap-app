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
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    content = content.replace(/TabsTriggerle/g, 'Table');
    content = content.replace(/<\/TabsTriggerle/g, '</Table');
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
    }
});
