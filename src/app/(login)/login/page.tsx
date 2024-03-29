import { FrmLogin } from '@/components'
import { getCurrentUser } from '@/auth/supaBaseAuth'

export default async function LoginPage() {
  const user = await getCurrentUser()
  // console.log('user', user)

  return (
    <>
      <FrmLogin />
    </>
  )
}
