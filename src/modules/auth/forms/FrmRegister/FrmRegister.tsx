'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { svgIsotipoConiap } from '@/assets'
import Link from 'next/link'
import { FormProvider, Controller, useForm } from 'react-hook-form'
import { registerAndSendEmailVerification, SignInWithGoogle } from '@/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface ICredentials {
  email: string
  password: string
}

export const FrmRegister = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const methods = useForm<ICredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: ICredentials) => {
    setLoading(true)
    const res = await registerAndSendEmailVerification(data)
    if (res === 'El correo ya está en uso') {
      toast.error(`El correo ${data.email} ya está en uso`)
    } else if (res === 'El correo no es válido') {
      toast.error('El correo no es válido')
    } else if (res === 'La contraseña es débil') {
      toast.error('La contraseña es débil')
    } else {
      toast.success(
        `Usuario creado con exito. Se ha enviado un correo de verificación a ${data.email}`
      )
      methods.reset()
      router.push('/login')
    }
    setLoading(false)
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    await SignInWithGoogle()
    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-4 w-full">
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
                  aria-label="email"
                  label="Correo electrónico"
                  
                  placeholder="ejemplo@ejemplo.com"
                  className="rounded-sm"
                  value={value}
                  onChange={onChange}
                  isInvalid={Boolean(methods.formState.errors.email)}
                  errorMessage={methods.formState.errors.email?.message}
                  disabled={loading}
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
                  
                  placeholder="* * * * * * * *"
                  type="password"
                  className="rounded-sm"
                  value={value}
                  onChange={onChange}
                  isInvalid={Boolean(methods.formState.errors.password)}
                  errorMessage={methods.formState.errors.password?.message}
                  disabled={loading}
                />
              )}
            />
            {/* <Input
            label="Celular"
            
            placeholder="999 999 999"
            type="phone"
            className="rounded-sm"
            description="Este campo es opcional"
          /> */}
            {/* <Input
            label="Nombres"
            
            placeholder="Escribe tus nombres"
            className="rounded-sm"
          />
          <Input
            label="Apellidos"
            
            placeholder="Escribe tus apellidos"
            className="rounded-sm"
          /> */}
            <Button fullWidth variant="default" size="lg" type="submit" disabled={loading} >
              Registrarse
            </Button>
          </form>
        </FormProvider>
        <footer className="flex gap-3 items-center">
          <Button
            fullWidth
            variant="outline"
            disabled={loading}
          >
            Iniciar con Google
          </Button>
          <Button
            fullWidth
            variant="outline"
            disabled={loading}
            onClick={signInWithGoogle}
          >
            Iniciar con Google
          </Button>
        </footer>
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
