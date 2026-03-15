import { createClient } from './utils/supabase/supabase/server';
import { cookies } from 'next/headers';

async function test() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('editions')
        .select('id, name, year, main_event_id');

    console.log('Error:', error);
    console.log('Editions count:', data?.length);
    if (data && data.length > 0) {
        console.log('Sample Editions:', data.map(e => ({ id: e.id, main_event_id: e.main_event_id })));
    }
}

test();
