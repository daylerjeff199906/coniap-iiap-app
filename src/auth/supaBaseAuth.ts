'use server'
import { createClient } from '@/utils/supabase/server'

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/admin'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export async function signInWithGoogleSB() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: getURL(),
    },
  })

  if (error) {
    console.error('error', error)
  } else {
    console.log('data', data)
    return data
  }
}

//obtener el usuario actual logueado
export async function getCurrentUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('error', error)
  } else {
    console.log('user', data.session)
    return data
  }
}

//cerrar sesion
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('error', error)
  } else {
    console.log('signOut')
  }
}
