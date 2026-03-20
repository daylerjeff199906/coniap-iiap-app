export async function bulkImportActivities(rows: any[]) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.from('event_sessions').insert(rows)
    if (error) return { error: error.message }

    revalidatePath('/', 'layout')
    return { success: true }
}
