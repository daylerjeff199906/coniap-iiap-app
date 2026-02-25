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

    // Pattern 1: href as curly braces {variable}
    // Pattern: <Button ... as={Link} ... href={URL} ... >TEXT</Button>
    // We need to capture attributes, href, and children.

    const buttonRegex = /<Button([\s\S]*?)>([\s\S]*?)<\/Button>/g;

    content = content.replace(buttonRegex, (match, attrs, children) => {
        if (attrs.includes('as={Link}')) {
            let hrefMatch = attrs.match(/href=({[^}]*}|"[^"]*")/);
            if (hrefMatch) {
                let href = hrefMatch[1];
                let newAttrs = attrs
                    .replace(/as={Link}/g, 'asChild')
                    .replace(/href=({[^}]*}|"[^"]*")/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();

                return `<Button ${newAttrs}>\n  <Link href=${href}>${children.trim()}</Link>\n</Button>`;
            }
        }
        return match;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Refactored Buttons in ${filePath}`);
    }
});
