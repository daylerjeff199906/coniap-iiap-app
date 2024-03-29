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
