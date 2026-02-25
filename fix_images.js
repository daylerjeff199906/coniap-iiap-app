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
    let originalContent = content;

    // Fix Next.js Image import
    content = content.replace(/import\s+{\s*Image\s*}\s+from\s+'next\/image'/g, "import Image from 'next/image'");

    // Remove NextUI Image props
    content = content.replace(/\s+removeWrapper/g, '');
    content = content.replace(/\s+isBlurred/g, '');
    content = content.replace(/\s+isZoomed/g, '');
    content = content.replace(/\s+showSkeleton/g, '');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed Image in ${filePath}`);
    }
});
