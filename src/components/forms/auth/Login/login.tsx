'use client'
import { Button, Input } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { signInWithCredentials } from '@/auth'

interface ILogin {
  email: string
  password: string
}

export const FrmLogin = () => {
  //   const { signInWithGoogle } = useAuth()
  const methods = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    // console.log(data)
    const res = await signInWithCredentials(data)
    console.log(res)
  }

  return (
    <section className="w-full flex items-center justify-center h-screen">
      {/* <button onClick={signInWithGoogle}>Login with Google</button> */}
      <div className="w-full max-w-sm border p-4 h-fit">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form
          className="w-full space-y-3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            control={methods.control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                type="email"
                placeholder="Email"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.email !== undefined}
                errorMessage={methods.formState.errors.email?.message}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { value, onChange } }) => (
              <Input
                type="password"
                placeholder="Password"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.password !== undefined}
                errorMessage={methods.formState.errors.password?.message}
              />
            )}
          />
          <Button
            variant="solid"
            color="primary"
            fullWidth
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </section>
  )
}
