'use client'
import React, { useState } from 'react'
import { Button, Input, Image } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signInWithCredentials, SignInWithGoogle } from '@/auth'
import { LoadingPages } from '@/components'
import { useAuthContext } from '@/provider'
import { toast } from 'react-toastify'
import Link from 'next/link'

function encryptString(value: string) {
  return btoa(value)
}

interface ILogin {
  email: string
  password: string
}

export const FrmForgotPassword = () => {
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
                color="primary"
                classNames={{
                  label: 'text-white',
                }}
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.email !== undefined}
                errorMessage={methods.formState.errors.email?.message}
              />
            )}
          />
        </section>
      </form>
      <section className="flex items-center gap-3">
        <hr className="w-full" />
      </section>
      <section className="flex flex-col">
        <Link
          href="/login"
          className="text-sm text-gray-200 hover:text-white hover:underline text-center"
        >
          Volver al inicio de sesión
        </Link>
      </section>
      <LoadingPages isOpen={loading} />
    </main>
  )
}
