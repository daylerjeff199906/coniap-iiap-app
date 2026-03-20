import fs from 'fs';

const path = "src/app/[locale]/(protected)/admin/(with_layout)/activities/components/ActivitiesTable.tsx";
const content = fs.readFileSync(path, 'utf-8');
const lines = content.split('\n');

const replacement = `                                                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                                        <span className="text-[12px] text-muted-foreground">
                                                            {activity.session_type ? sessionTypeLabels[activity.session_type] : 'Presentación'}
                                                        </span>
                                                        {activity.main_events && (
                                                            <>
                                                                <span className="text-muted-foreground/40">•</span>
                                                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 bg-muted/60 text-muted-foreground font-normal">
                                                                    {typeof activity.main_events.name === 'string' ? activity.main_events.name : activity.main_events.name?.es}
                                                                </Badge>
                                                            </>
                                                        )}
                                                        {activity.editions && (
                                                            <>
                                                                <span className="text-muted-foreground/40">•</span>
                                                                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 bg-blue-50/50 text-blue-600 border-blue-200/60 font-medium">
                                                                    {typeof activity.editions.name === 'string' ? activity.editions.name : activity.editions.name?.es}
                                                                </Badge>
                                                            </>
                                                        )}
                                                    </div>`;

lines.splice(108, 3, replacement);
fs.writeFileSync(path, lines.join('\n'));
console.log("Replaced successfully");
