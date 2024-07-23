'use client'
import React, { useState } from 'react'
import { Button, Input, Image } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signInWithCredentials, SignInWithGoogle } from '@/auth'
import { LoadingPages } from '@/components'
import { useAuthContext } from '@/provider'
import { toast } from 'react-toastify'
import Google from './GoogleIcon'
import Link from 'next/link'

function encryptString(value: string) {
  return btoa(value)
}

interface ILogin {
  email: string
  password: string
}

export const FrmLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setUserData } = useAuthContext()
  const methods = useForm<ILogin>()
  const router = useRouter()

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setLoading(true)
    const res = await signInWithCredentials(data)

    if (res) {
      toast.success('Bienvenido ' + res?.userName)
      await setUserData(res)
      if (res.role) {
        if (res.role.includes('admin')) {
          router.push('/admin')
        } else if (res.role.includes('superadmin')) {
          router.push('/admin')
        } else if (res.role.includes('editor')) {
          router.push('/admin')
        } else if (res.role.includes('speaker')) {
          router.push('/dashboard')
        }
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    const res = await SignInWithGoogle()
    if (res) {
      toast.success('Bienvenido ' + res?.userName)
      await setUserData(res)
      if (res.role) {
        if (res.role.includes('admin')) {
          router.push('/admin')
        } else if (res.role.includes('superadmin')) {
          router.push('/admin')
        } else if (res.role.includes('editor')) {
          router.push('/admin')
        } else if (res.role.includes('speaker')) {
          router.push('/dashboard')
        }
      } else {
        if (res.person && res.person.typePerson === 'participant') {
          router.push('/inscripciones/info')
        } else {
          router.push(
            `/next-steps?email=${encryptString(res.email)}&name=${encryptString(
              res.userName
            )}&photo=${encryptString(res.photo)}`
          )
        }
      }
    } else {
      toast.error('Error al iniciar sesión')
    }
    setLoading(false)
  }

  return (
    <main className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-3">
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
          <Link
            href="/auth/forgot-password"
            className="text-center text-xs text-primary-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
      <section className="flex items-center gap-3">
        <hr className="w-full" />
        <p>o</p>
        <hr className="w-full" />
      </section>
      <section className="flex flex-col gap-4">
        <Button
          radius="sm"
          fullWidth
          className="flex items-center justify-center space-x-2"
          variant="light"
          onPress={handleGoogle}
          startContent={
            <Google
              width="20"
              height="20"
              fill="currentColor"
            />
          }
        >
          Sign in with Google
        </Button>
        <Link
          href="/"
          className="text-center text-xs text-gray-500 hover:underline"
        >
          Volver al inicio
        </Link>
      </section>

      <LoadingPages isOpen={loading} />
    </main>
  )
}
