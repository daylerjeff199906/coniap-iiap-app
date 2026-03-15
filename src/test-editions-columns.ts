import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function test() {
  const { data, error } = await supabase.from('editions').select('*').limit(1);
  console.log("Editions columns:", data ? Object.keys(data[0]) : "No data", error);
}

test();
