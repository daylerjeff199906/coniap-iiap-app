import fs from 'fs';

const path = "src/app/[locale]/(protected)/admin/(with_layout)/activities/components/ActivitiesTable.tsx";
let content = fs.readFileSync(path, 'utf-8');

// Insert imports at the top
const importInject = `import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconLayoutGrid, IconLayoutList, IconCalendarEvent } from '@tabler/icons-react'
import { ActivitiesAgendaView } from './ActivitiesAgendaView'
import { ActivitiesScheduleView } from './ActivitiesScheduleView'
`;

content = content.replace(/import { useState/, `${importInject}import { useState`);

// Insert state inside ActivitiesTable
content = content.replace(/const \[deleteText, setDeleteText\]/, `const [view, setView] = useState<'table' | 'agenda' | 'schedule'>('table')\n    const [deleteText, setDeleteText]`);

// Replace render wrapper
const startRender = `<TooltipProvider delayDuration={200}>
            <div className="rounded-2xl border overflow-hidden mt-2 bg-card">`;

const replacementRender = `<TooltipProvider delayDuration={200}>
            <div className="space-y-4">
                <div className="flex justify-end mt-2">
                    <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-auto">
                        <TabsList className="rounded-xl h-10 bg-muted/50 p-1">
                            <TabsTrigger value="table" className="rounded-lg text-xs gap-1 py-1.5"><IconLayoutList size={14}/> Tabla</TabsTrigger>
                            <TabsTrigger value="agenda" className="rounded-lg text-xs gap-1 py-1.5"><IconLayoutGrid size={14}/> Agenda</TabsTrigger>
                            <TabsTrigger value="schedule" className="rounded-lg text-xs gap-1 py-1.5"><IconCalendarEvent size={14}/> Horario</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {view === 'table' && (
                    <div className="rounded-2xl border overflow-hidden bg-card">`;

content = content.replace(startRender, replacementRender);

// Replace close of table
// Locate table close that follows TableBody with AlertDialog
content = content.replace(/<\/Table>\s+<\/div>/, `</Table>\n                    </div>\n                )}\n\n                {view === 'agenda' && <ActivitiesAgendaView activities={activities} />}\n                {view === 'schedule' && <ActivitiesScheduleView activities={activities} />}`);

fs.writeFileSync(path, content);
console.log("Switcher added successfully");
