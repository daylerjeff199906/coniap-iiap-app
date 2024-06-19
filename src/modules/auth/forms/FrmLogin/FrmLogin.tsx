'use client'
import { useState } from 'react'
import { Button, Divider, Input } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { signInWithCredentials, SignInWithGoogle } from '@/auth'
import { LoadingPages } from '@/components'
import { createCookie, createLocalStorage } from '@/lib'
import { useAuth } from '@/hooks/auth'
import { toast } from 'sonner'

interface ILogin {
  email: string
  password: string
}

export const FrmLogin = () => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<ILogin>()
  const { setUser } = useAuth()
  const router = useRouter()

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setLoading(true)
    const res = await signInWithCredentials(data)
    await createCookie('user', JSON.stringify(res))
    await createLocalStorage('user', res)

    setUser(res)

    if (res !== null) {
      if (res?.role === 'admin') {
        router.push('/admin')
      } else if (res?.role !== 'participant') {
        toast.success('Bienvenido', { position: 'top-right' })
        router.push('/dashboard')
      } else {
        toast.success('Bienvenido', { position: 'top-right' })
        router.push('/')
      }
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    const res = await SignInWithGoogle()

    await createCookie('user', JSON.stringify(res))
    await createLocalStorage('user', res)

    new Promise((resolve) => setTimeout(resolve, 1000))
    if (res !== null) {
      if (res?.role === 'admin') {
        router.push('/admin')
      } else if (res?.role !== 'participant') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <form
        className="w-full flex flex-col gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-5">
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
                label="Correo electrónico"
                labelPlacement="outside"
                type="email"
                placeholder="correo@correo.com"
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
                label="Contraseña"
                labelPlacement="outside"
                placeholder="* * * * * * * *"
                radius="sm"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.password !== undefined}
                errorMessage={methods.formState.errors.password?.message}
              />
            )}
          />
        </section>
        {/* <section className="pt-2 flex justify-end">
          <Link
            href="/forgotPassword"
            className="text-primary-500 hover:text-primary-800 cursor-pointer text-xs text-end pb-2 underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </section> */}
        <Button
          variant="solid"
          color="primary"
          fullWidth
          radius="sm"
          type="submit"
          isDisabled={loading}
          isLoading={loading}
          size="lg"
        >
          Iniciar sesión
        </Button>
      </form>
      {/* <section className="pt-3 flex flxe-col justify-center items-center pb-3">
        <Link
          href="/singIn"
          className="text-center text-sm text-primary-500 hover:text-primary-800 cursor-pointer"
        >
          ¿ No tienes cuenta? <span className="font-bold">Regístrate</span>
        </Link>
      </section> */}
      <Divider />
      <section className="pt-6 ">
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

      <LoadingPages isOpen={loading} />
    </>
  )
}
