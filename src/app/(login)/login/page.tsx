import { signInWithGoogle } from '@/auth'

export default function LoginPage() {
  return (
    <>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </>
  )
}
