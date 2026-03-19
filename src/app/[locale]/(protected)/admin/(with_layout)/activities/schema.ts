import { z } from 'zod'

// Zod Schema for validation
export const activitySchema = z.object({
    name: z.string({ required_error: 'El nombre es obligatorio' }).min(3, 'Mínimo 3 caracteres'),
    date: z.string().nullable().optional().or(z.literal('')),
    timeStart: z.string().nullable().optional().or(z.literal('')),
    timeEnd: z.string().nullable().optional().or(z.literal('')),
    shortDescription: z.string().nullable().optional(),
    sala: z.number().nullable().optional(),
    isActived: z.boolean(),
    main_event_id: z.string().nullable().optional().or(z.literal('')),
    edition_id: z.string().nullable().optional().or(z.literal('')),
    customContent: z.string().nullable().optional(),
})

export type ActivityFormInput = z.infer<typeof activitySchema>
