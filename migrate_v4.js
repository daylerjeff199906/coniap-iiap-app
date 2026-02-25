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
    'Tab': { from: '@nextui-org/react', to: '@/components/ui/tabs', name: 'TabTrigger' },
    'Chip': { from: '@nextui-org/react', to: '@/components/ui/badge', name: 'Badge' },
    'Skeleton': { from: '@nextui-org/react', to: '@/components/ui/skeleton', name: 'Skeleton' },
    'Divider': { from: '@nextui-org/react', to: '@/components/ui/separator', name: 'Separator' },
    'Textarea': { from: '@nextui-org/react', to: '@/components/ui/textarea', name: 'Textarea' },
    'Select': { from: '@nextui-org/react', to: '@/components/ui/select', name: 'Select' },
    'SelectItem': { from: '@nextui-org/react', to: '@/components/ui/select', name: 'SelectItem' },
    'Spinner': { from: '@nextui-org/react', to: '@/components/ui/spinner', name: 'Spinner' },
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
    if (filePath.includes('node_modules')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove variant="solid" as it's default in Shadcn or invalid
    content = content.replace(/variant="solid"/g, '');

    // Map variants
    content = content.replace(/variant="bordered"/g, 'variant="outline"');
    content = content.replace(/variant="flat"/g, 'variant="secondary"');
    content = content.replace(/variant="light"/g, 'variant="ghost"');

    // Map colors to variants where applicable (common in NextUI Button)
    content = content.replace(/color="primary"/g, 'variant="default"');
    content = content.replace(/color="danger"/g, 'variant="destructive"');
    content = content.replace(/color="secondary"/g, 'variant="secondary"');
    content = content.replace(/color="success"/g, 'variant="default"'); // No success variant in Shadcn standard
    content = content.replace(/color="warning"/g, 'variant="outline"'); // Approximation
    content = content.replace(/color="default"/g, 'variant="outline"');

    // Props removal
    content = content.replace(/radius="[^"]*"/g, '');
    content = content.replace(/shadow="[^"]*"/g, '');
    content = content.replace(/labelPlacement="[^"]*"/g, '');
    content = content.replace(/isIconOnly/g, 'size="icon"');
    content = content.replace(/isDisabled={([^}]*)}/g, 'disabled={$1}');
    content = content.replace(/isDisabled/g, 'disabled');
    content = content.replace(/isLoading/g, 'disabled'); // Simplification
    content = content.replace(/onPress=/g, 'onClick=');

    // Handle duplicate variants introduced by previous replacements
    content = content.replace(/variant="destructive"\s+variant="default"/g, 'variant="destructive"');
    content = content.replace(/variant="default"\s+variant="destructive"/g, 'variant="destructive"');
    // More general cleanup of double variants
    content = content.replace(/variant="([^"]*)"\s+variant="[^"]*"/g, 'variant="$1"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
});
