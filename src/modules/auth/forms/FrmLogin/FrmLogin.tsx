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
  const { errors } = methods.formState
  const router = useRouter()

  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setLoading(true)
    const res = await signInWithCredentials(data)

    console.log('res', res)

    if (res) {
      await setUserData(res)
      if (res.role) {
        if (res.role.length > 0) {
          toast.success('Bienvenido ' + res?.userName)
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
          toast.info('No tienes permisos para acceder')
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

  let message = ''

  if (errors.email && errors.password) {
    message = 'Email y contraseña son requeridos'
  } else if (errors.email) {
    message = errors.email.message as string
  } else if (errors.password) {
    message = errors.password.message as string
  }

  return (
    <main className="flex flex-col gap-3">
      <form
        className="w-full flex flex-col gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {message && <AlertComponent message={message} />}
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
                color="primary"
                classNames={{
                  label: 'text-white',
                }}
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.email !== undefined}
                // errorMessage={methods.formState.errors.email?.message}
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
                color="primary"
                classNames={{
                  label: 'text-white',
                }}
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.password !== undefined}
                // errorMessage={methods.formState.errors.password?.message}
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
          >
            Iniciar sesión
          </Button>
          <Link
            href="/forgot-password"
            className="text-center text-xs text-primary-300 hover:underline"
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
          className="flex items-center justify-center space-x-2 text-white"
          variant="light"
          onPress={handleGoogle}
          isLoading={loading}
          isDisabled={loading}
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
          className="text-center text-xs text-gray-400 hover:underline"
        >
          Volver al inicio
        </Link>
      </section>

      <LoadingPages isOpen={loading} />
    </main>
  )
}

const AlertComponent = ({ message }: { message: string }) => {
  return (
    <section className="flex items-center gap-3  p-3 rounded-md border border-danger-500 bg-danger-500/20">
      <p className="text-xs ">{message}</p>
    </section>
  )
}
