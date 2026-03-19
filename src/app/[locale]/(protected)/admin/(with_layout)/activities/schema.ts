import { z } from 'zod'

export const sessionTypeEnum = z.enum([
    'keynote',
    'presentation',
    'panel',
    'workshop',
    'networking',
    'break',
    'other'
])

export const activitySchema = z.object({
    title: z.string({ required_error: 'El título es obligatorio' }).min(3, 'Mínimo 3 caracteres'),
    session_date: z.string().nullable().optional().or(z.literal('')),
    start_time: z.string().nullable().optional().or(z.literal('')),
    end_time: z.string().nullable().optional().or(z.literal('')),
    short_description: z.string().nullable().optional(),
    room_id: z.coerce.number().nullable().optional(),
    is_active: z.boolean(),
    main_event_id: z.string().nullable().optional().or(z.literal('')),
    edition_id: z.string().nullable().optional().or(z.literal('')),
    custom_content: z.string().nullable().optional(),
    session_type: sessionTypeEnum,
    is_online: z.boolean(),
    stream_platform: z.string().nullable().optional(),
    stream_url: z.string().url('URL inválida').nullable().optional().or(z.literal('')),
    stream_password: z.string().nullable().optional(),
})

export type ActivityFormInput = z.infer<typeof activitySchema>
