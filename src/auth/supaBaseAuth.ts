'use server'
import { createClient } from '@/utils/supabase/server'

export async function signInWithGoogleSB() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('error', error)
  } else {
    console.log('data', data)
    return data
  }
}
