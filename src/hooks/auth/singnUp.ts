import { createClient } from '@/utils/supabase/server'

interface ICrendentials {
  email: string
  password: string
}

async function signUpNewUser(props: ICrendentials) {
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
  console.log(data, error)
}
