'use server'
import { createClient } from '@/utils/supabase/server'

interface ICrendentials {
  email: string
  password: string
}

interface IError {
  code: string
  message: string
}

export async function signUpNewUser(props: ICrendentials) {
  const { email, password } = props
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email: `${email}`,
    password: `${password}`,
    options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      emailRedirectTo: '/',
    },
  })

  console.log(data)
    console.log(error)

  if (error) {
    const err = error as unknown as IError
    if (err.code === 'auth/email-already-in-use') {
      return 'El correo ya está en uso'
    } else if (err.code === 'auth/invalid-email') {
      return 'El correo no es válido'
    } else if (err.code === 'auth/weak-password') {
      return 'La contraseña es débil'
    } else {
      return err.message
    }
  } else {
    return data
  }
}
