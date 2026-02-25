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

    // Remove duplicate disabled={...}
    // We'll keep the one that seems more complex or just the last one.
    const componentRegex = /<[A-Z][a-zA-Z0-9]*([\s\S]*?)>/g;

    content = content.replace(componentRegex, (match) => {
        let attrs = match;
        const props = ['disabled', 'variant', 'size', 'className'];

        props.forEach(prop => {
            const propRegex = new RegExp(`${prop}=({[^}]*}|"[^"]*")`, 'g');
            let matches = [...attrs.matchAll(propRegex)];
            if (matches.length > 1) {
                // Keep only the last occurrence for now as a simple rule
                let lastMatch = matches[matches.length - 1][0];
                let count = 0;
                attrs = attrs.replace(propRegex, (m) => {
                    count++;
                    return (count === matches.length) ? m : '';
                });
                // Clean up extra spaces
                attrs = attrs.replace(/\s+/g, ' ');
            }
        });
        return attrs;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned up duplicate props in ${filePath}`);
    }
});
