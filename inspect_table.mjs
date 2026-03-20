import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwzmtsoeotjftvzdaa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3d6bXRzb2VvdGpmdHZ6ZGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzODk0NzQsImV4cCI6MjAyNjk2NTQ3NH0.kEnXI2fjIiIFWW-Y1g5bLUfBq-9xcos1e4IwjPveSb0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
    const { data, error } = await supabase.from('event_sessions').select('*').limit(1)
    if (error) {
        console.error("Error Selecting:", error)
    } else {
        if (data && data.length > 0) {
            console.log("Columns:", Object.keys(data[0]))
        } else {
            console.log("No data rows found using anon Select. Trying RPC if available...")
        }
    }
}
run()
