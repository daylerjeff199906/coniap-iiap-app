const fs = require('fs');
const path = require('path');

const MAPPINGS = {
    'Button': { from: '@nextui-org/react', to: '@/components/ui/button', name: 'Button' },
    'Input': { from: '@nextui-org/react', to: '@/components/ui/input', name: 'Input' },
    'Card': { from: '@nextui-org/react', to: '@/components/ui/card', name: 'Card' },
    'CardBody': { from: '@nextui-org/react', to: '@/components/ui/card', name: 'CardContent' },
    'CardHeader': { from: '@nextui-org/react', to: '@/components/ui/card', name: 'CardHeader' },
    'CardFooter': { from: '@nextui-org/react', to: '@/components/ui/card', name: 'CardFooter' },
    'Checkbox': { from: '@nextui-org/react', to: '@/components/ui/checkbox', name: 'Checkbox' },
    'CheckboxGroup': { from: '@nextui-org/react', to: null, name: 'div' },
    'Tabs': { from: '@nextui-org/react', to: '@/components/ui/tabs', name: 'Tabs' },
    'Tab': { from: '@nextui-org/react', to: '@/components/ui/tabs', name: 'TabTrigger' },
    'Chip': { from: '@nextui-org/react', to: '@/components/ui/badge', name: 'Badge' },
    'Skeleton': { from: '@nextui-org/react', to: '@/components/ui/skeleton', name: 'Skeleton' },
    'Divider': { from: '@nextui-org/react', to: '@/components/ui/separator', name: 'Separator' },
    'Textarea': { from: '@nextui-org/react', to: '@/components/ui/textarea', name: 'Textarea' },
    'Select': { from: '@nextui-org/react', to: '@/components/ui/select', name: 'Select' },
    'SelectItem': { from: '@nextui-org/react', to: '@/components/ui/select', name: 'SelectItem' },
    'Modal': { from: '@nextui-org/react', to: '@/components/ui/dialog', name: 'Dialog' },
    'ModalContent': { from: '@nextui-org/react', to: '@/components/ui/dialog', name: 'DialogContent' },
    'ModalHeader': { from: '@nextui-org/react', to: '@/components/ui/dialog', name: 'DialogHeader' },
    'ModalBody': { from: '@nextui-org/react', to: '@/components/ui/dialog', name: 'DialogBody' },
    'ModalFooter': { from: '@nextui-org/react', to: '@/components/ui/dialog', name: 'DialogFooter' },
    'Popover': { from: '@nextui-org/react', to: '@/components/ui/popover', name: 'Popover' },
    'PopoverTrigger': { from: '@nextui-org/react', to: '@/components/ui/popover', name: 'PopoverTrigger' },
    'PopoverContent': { from: '@nextui-org/react', to: '@/components/ui/popover', name: 'PopoverContent' },
    'Link': { from: '@nextui-org/react', to: 'next/link', name: 'Link' },
    'Image': { from: '@nextui-org/react', to: 'next/image', name: 'Image' },
    'Table': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'Table' },
    'TableHeader': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'TableHeader' },
    'TableColumn': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'TableHead' },
    'TableBody': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'TableBody' },
    'TableRow': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'TableRow' },
    'TableCell': { from: '@nextui-org/react', to: '@/components/ui/table', name: 'TableCell' },
    'Pagination': { from: '@nextui-org/react', to: '@/components/ui/pagination', name: 'Pagination' },
    'Spinner': { from: '@nextui-org/react', to: '@/components/ui/spinner', name: 'Spinner' },
    'Selection': { from: '@nextui-org/react', to: null, name: 'any' },
    'User': { from: '@nextui-org/react', to: null, name: 'any' },
    'Avatar': { from: '@nextui-org/react', to: '@/components/ui/avatar', name: 'Avatar' },
    'Badge': { from: '@nextui-org/react', to: '@/components/ui/badge', name: 'Badge' },
};

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
    let changed = false;

    // Replace NextUI imports with Shadcn/Next equivalents
    const nextuiRegex = /import\s+{([^}]+)}\s+from\s+'@nextui-org\/react'/g;
    let match;
    while ((match = nextuiRegex.exec(content)) !== null) {
        const items = match[1].split(',').map(i => i.trim()).filter(i => i !== '');
        const newImportLines = [];
        const remainingNextUI = [];

        items.forEach(item => {
            const [originalName, alias] = item.split(/\s+as\s+/).map(s => s.trim());
            const nameToUse = originalName;

            if (MAPPINGS[nameToUse]) {
                const map = MAPPINGS[nameToUse];
                if (map.to) {
                    newImportLines.push(`import { ${item.replace(nameToUse, map.name)} } from '${map.to}'`);
                    changed = true;
                } else if (map.name === 'any') {
                    // Just don't import it, we'll try to replace usage with any if it's a type
                    changed = true;
                } else {
                    remainingNextUI.push(item);
                }
            } else {
                remainingNextUI.push(item);
            }
        });

        let replacement = newImportLines.join('\n');
        if (remainingNextUI.length > 0) {
            replacement += (replacement ? '\n' : '') + `// TODO: Check these imports: import { ${remainingNextUI.join(', ')} } from '@nextui-org/react'`;
        }

        content = content.replace(match[0], replacement);
    }

    // Tag replacements within the file
    if (changed || content.includes('@nextui-org/react')) {
        for (const [oldName, map] of Object.entries(MAPPINGS)) {
            if (!map.name || map.name === oldName) continue;
            const openTagRegex = new RegExp(`<${oldName}(\\s|>)`, 'g');
            const closeTagRegex = new RegExp(`</${oldName}>`, 'g');
            content = content.replace(openTagRegex, `<${map.name}$1`);
            content = content.replace(closeTagRegex, `</${map.name}>`);

            // Also replace types
            const typeRegex = new RegExp(`:\\s*${oldName}(\\s|;|\\)|,)`, 'g');
            content = content.replace(typeRegex, `: ${map.name}$1`);
        }

        content = content.replace(/onPress=/g, 'onClick=');
        content = content.replace(/variant="flat"/g, 'variant="secondary"');
        content = content.replace(/variant="light"/g, 'variant="ghost"');
        content = content.replace(/color="primary"/g, 'variant="default"');
        content = content.replace(/color="danger"/g, 'variant="destructive"');
        content = content.replace(/radius="full"/g, 'className="rounded-full"');
        content = content.replace(/radius="sm"/g, 'className="rounded-sm"');

        // Final wipe of any remaining NextUI imports that might have been missed or are empty
        content = content.replace(/import\s+{([^}]*)}\s+from\s+'@nextui-org\/react'/g, '// Removed NextUI import: $1');

        fs.writeFileSync(filePath, content);
    }
});
