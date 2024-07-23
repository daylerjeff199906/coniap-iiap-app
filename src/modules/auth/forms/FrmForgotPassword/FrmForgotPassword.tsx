'use client'
import React, { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { sendResetPasswordEmail } from '@/auth'
import { LoadingPages } from '@/components'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { error } from 'console'

interface IForgotPassword {
  email: string
}

export const FrmForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<IForgotPassword>()
  const router = useRouter()

  const onSubmit: SubmitHandler<IForgotPassword> = async (
    data: IForgotPassword
  ) => {
    setLoading(true)
    const res = await sendResetPasswordEmail(data.email)

    if (res === 'Email sent') {
      toast.success('Email enviado')
      router.push('/login')
    } else {
      toast.error('Error al enviar el correo')
    }
    setLoading(false)
  }

  return (
    <main className="flex flex-col gap-6">
      <section>
        <p className="text-xs text-gray-200">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>
      </section>
      {methods.formState.errors.email !== undefined && (
        <section className="flex items-center gap-3  p-3 rounded-md border border-danger-500 bg-danger-500/20">
          <p className="text-xs ">{methods.formState.errors.email?.message}</p>
        </section>
      )}

      <form
        className="w-full flex flex-col gap-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-5">
          <Controller
            control={methods.control}
            name="email"
            rules={{
              required: 'El correo electrónico es requerido',
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
                required
                // isInvalid={methods.formState.errors.email !== undefined}
                // errorMessage={methods.formState.errors.email?.message}
              />
            )}
          />
        </section>
        <section className="flex items-center gap-3">
          <Button
            type="submit"
            color="primary"
            fullWidth
            disabled={loading}
            isLoading={loading}
            radius="sm"
          >
            Enviar correo
          </Button>
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
