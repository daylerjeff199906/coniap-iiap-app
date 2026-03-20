import fs from 'fs'

const path = "src/app/[locale]/(protected)/admin/(with_layout)/activities/actions.ts"
let content = fs.readFileSync(path, 'utf-8')

const appendText = `
export async function bulkImportActivities(rows: any[]) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.from('event_sessions').insert(rows)
    if (error) return { error: error.message }

    revalidatePath('/', 'layout')
    return { success: true }
}
`

fs.writeFileSync(path, content + appendText)
console.log("Appended successfully")
