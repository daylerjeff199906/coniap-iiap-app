'use client'
import { Button, Image, Input } from '@nextui-org/react'
import { svgIsotipoConiap } from '@/assets'
import Link from 'next/link'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import { registerAndSendEmailVerification, SignInWithGoogle } from '@/auth'
import { useState } from 'react'

interface ICredentials {
  email: string
  password: string
}

export const FrmRegister = () => {
  const [loading, setLoading] = useState(false)
  const methods = useForm<ICredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: ICredentials) => {
    setLoading(true)
    await registerAndSendEmailVerification(data)
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    await SignInWithGoogle()
    setLoading(false)
  }

  return (
    <>
      <div className="max-w-md px-8 py-10 flex flex-col justify-center gap-4 shadow-large rounded-lg w-full">
        <div className="flex gap-3 items-center justify-center">
          <Image
            src={svgIsotipoConiap.src}
            alt="Logo de CONIAP"
            removeWrapper
            className="w-24"
          />
          <div>
            <h1 className="text-2xl font-bold">Regístrate</h1>
            <p className="text-sm text-gray-600">Crea tu cuenta en CONIAP</p>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={methods.control}
              rules={{
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Correo no válido',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  aria-label="Usuario"
                  label="Usuario"
                  labelPlacement="outside"
                  placeholder="Escribe tu usuario"
                  radius="sm"
                  value={value}
                  onChange={onChange}
                  isInvalid={Boolean(methods.formState.errors.email)}
                  errorMessage={methods.formState.errors.email?.message}
                  isDisabled={loading}
                />
              )}
            />
            <Controller
              name="password"
              rules={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <Input
                  aria-label="Contraseña"
                  label="Contraseña"
                  labelPlacement="outside"
                  placeholder="Escribe tu contraseña"
                  type="password"
                  radius="sm"
                  value={value}
                  onChange={onChange}
                  isInvalid={Boolean(methods.formState.errors.password)}
                  errorMessage={methods.formState.errors.password?.message}
                  isDisabled={loading}
                />
              )}
            />
            {/* <Input
            label="Celular"
            labelPlacement="outside"
            placeholder="999 999 999"
            type="phone"
            radius="sm"
            description="Este campo es opcional"
          /> */}
            {/* <Input
            label="Nombres"
            labelPlacement="outside"
            placeholder="Escribe tus nombres"
            radius="sm"
          />
          <Input
            label="Apellidos"
            labelPlacement="outside"
            placeholder="Escribe tus apellidos"
            radius="sm"
          /> */}
            <Button
              fullWidth
              variant="solid"
              color="primary"
              size="lg"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Registrarse
            </Button>
          </form>
        </FormProvider>
        <div className="flex gap-3 items-center">
          <Button
            fullWidth
            variant="bordered"
            isDisabled={loading}
          >
            Iniciar con Google
          </Button>
          <Button
            fullWidth
            variant="bordered"
            isDisabled={loading}
            onPress={signInWithGoogle}
          >
            Iniciar con Google
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            href="/login"
            className="text-xs text-primary-500 hover:text-primary-300"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </>
  )
}
