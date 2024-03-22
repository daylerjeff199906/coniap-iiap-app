'use client'
import { useState } from 'react'
import { Button, Divider, Input } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { signInWithCredentials, SignInWithGoogle } from '@/auth'
import { LoadingPages } from '@/components'
import { IUser } from '@/types'

interface ILogin {
  email: string
  password: string
}

export const FrmLogin = () => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<ILogin>()
  const router = useRouter()

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setLoading(true)
    const res = await signInWithCredentials(data)
    console.log(res)
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    const data = await SignInWithGoogle()
    console.log(data)
    if (data !== null) {
      if (data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <section className="w-full flex items-center justify-center h-screen">
        {/* <button onClick={signInWithGoogle}>Login with Google</button> */}
        <div className="w-full max-w-md  px-8 py-6 h-fit shadow-2xl rounded-lg">
          <h1 className="text-2xl font-bold text-center pb-8">
            Iniciar Sesión
          </h1>
          <form
            className="w-full space-y-4 pb-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <section className="space-y-12">
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
                    label="Email"
                    labelPlacement="outside"
                    type="email"
                    placeholder="Email"
                    radius="sm"
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
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Password"
                    radius="sm"
                    value={value}
                    onValueChange={onChange}
                    isInvalid={methods.formState.errors.password !== undefined}
                    errorMessage={methods.formState.errors.password?.message}
                  />
                )}
              />
            </section>
            <Button
              variant="solid"
              color="primary"
              fullWidth
              radius="sm"
              type="submit"
              isDisabled={loading}
              isLoading={loading}
            >
              Iniciar sesión
            </Button>
          </form>
          <Divider />
          <section className="pt-6">
            <Button
              radius="sm"
              fullWidth
              className="flex items-center justify-center space-x-2"
              variant="light"
              onPress={handleGoogle}
            >
              Sign in with Google
            </Button>
          </section>
        </div>
      </section>
      <LoadingPages isOpen={loading} />
    </>
  )
}
