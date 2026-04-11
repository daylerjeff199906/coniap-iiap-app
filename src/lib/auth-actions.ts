'use server';

import { createClient } from '@/utils/supabase/supabase/server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signout() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    await supabase.auth.signOut();

    // Determinar URL de redirección según el entorno
    const headerList = await headers();
    const host = headerList.get('host') || '';
    const isDev = host.includes('localhost') || host.includes('127.0.0.1');
    const loginUrl = isDev ? 'http://localhost:3003/login' : 'https://auth.iiap.gob.pe/login';

    redirect(loginUrl);
}
