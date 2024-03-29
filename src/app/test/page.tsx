'use client'
import { signInWithGoogleSB } from '@/auth/supaBaseAuth'

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const data = await signInWithGoogleSB()
    // const dataString = JSON.stringify(data)
    const url = data?.url
    //abrira una nueva ventana para iniciar sesion con google
    window.open(url, '_blank')
  }
  return (
    <>
      <button
        onClick={() => {
          signInWithGoogle()
        }}
      >
        Login with Google
      </button>
    </>
  )
}
