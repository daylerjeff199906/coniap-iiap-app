import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'

export const FrmLogin = () => {
  //   const { signInWithGoogle } = useAuth()
  return (
    <section className="w-full flex items-center justify-center h-screen">
      {/* <button onClick={signInWithGoogle}>Login with Google</button> */}
      <div className="w-full max-w-sm border p-4 h-fit">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form className="w-full space-y-3">
          <Input
            type="email"
            placeholder="Email"
          />
          <Input
            type="password"
            placeholder="Password"
          />
          <Button
            variant="solid"
            color="primary"
            fullWidth
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </section>
  )
}
