import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
    return createServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet: any[]) {
                    try {
                        const host = process.env.NEXT_PUBLIC_APP_URL;
                        const isIiapDomain = host?.includes('iiap.gob.pe');
                        
                        cookiesToSet.forEach(({ name, value, options }) => 
                            cookieStore.set(name, value, {
                                ...options,
                                domain: isIiapDomain ? '.iiap.gob.pe' : undefined,
                            })
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
};
