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
    'Tabs': { from: '@nextui-org/react', to: '@/components/ui/tabs', name: 'Tabs' },
    'Tab': { from: '@nextui-org/react', to: '@/components/ui/tabs', name: 'TabsTrigger' },
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
};

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

walk('src', (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace imports
    const nextuiImportMatch = content.match(/import\s+{([^}]+)}\s+from\s+'@nextui-org\/react'/);
    if (nextuiImportMatch) {
        const items = nextuiImportMatch[1].split(',').map(i => i.trim());
        const shadcnImports = {};
        const remainingNextUI = [];

        items.forEach(item => {
            const parts = item.split(/\s+as\s+/);
            const originalName = parts[0];
            const alias = parts[1] || originalName;

            if (MAPPINGS[originalName]) {
                const map = MAPPINGS[originalName];
                if (!shadcnImports[map.to]) shadcnImports[map.to] = [];
                shadcnImports[map.to].push(item.replace(originalName, map.name));
                changed = true;
            } else {
                remainingNextUI.push(item);
            }
        });

        let newImports = '';
        if (remainingNextUI.length > 0) {
            newImports += `import { ${remainingNextUI.join(', ')} } from '@nextui-org/react'\n`;
        }
        for (const [lib, libItems] of Object.entries(shadcnImports)) {
            newImports += `import { ${libItems.join(', ')} } from '${lib}'\n`;
        }

        content = content.replace(nextuiImportMatch[0], newImports.trim());
    }

    // Simple tag replacements
    if (changed) {
        content = content.replace(/<CardBody/g, '<CardContent');
        content = content.replace(/<\/CardBody/g, '<\/CardContent');
        content = content.replace(/<Divider/g, '<Separator');
        content = content.replace(/<\/Divider/g, '<\/Separator');
        content = content.replace(/<Chip/g, '<Badge');
        content = content.replace(/<\/Chip/g, '<\/Badge');
        content = content.replace(/<Tab/g, '<TabsTrigger');
        content = content.replace(/<\/Tab/g, '<\/TabsTrigger');
        content = content.replace(/onPress=/g, 'onClick=');

        // Button variant mapping (very basic)
        content = content.replace(/variant="flat"/g, 'variant="secondary"');
        content = content.replace(/variant="light"/g, 'variant="ghost"');
        content = content.replace(/color="primary"/g, 'variant="default"');
        content = content.replace(/color="danger"/g, 'variant="destructive"');

        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
});
