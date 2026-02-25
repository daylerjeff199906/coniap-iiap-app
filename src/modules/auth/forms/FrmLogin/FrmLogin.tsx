'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signInWithCredentials, SignInWithGoogle } from '@/auth'
import { LoadingPages } from '@/components'
import { useAuthContext } from '@/provider'
import { toast } from 'react-toastify'
import Google from './GoogleIcon'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
    try {
      const res = await signInWithCredentials(data)

      if (res) {
        await setUserData(res)
        if (res.role) {
          if (res.role.length > 0) {
            toast.success('Bienvenido ' + res?.userName)
            if (res.role.includes('admin') || res.role.includes('superadmin') || res.role.includes('editor')) {
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
    } catch (error) {
      toast.error('Error al iniciar sesión')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      const res = await SignInWithGoogle()
      if (res) {
        toast.success('Bienvenido ' + res?.userName)
        await setUserData(res)
        if (res.role) {
          if (res.role.includes('admin') || res.role.includes('superadmin') || res.role.includes('editor')) {
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
        toast.error('Error al iniciar sesión con Google')
      }
    } catch (error) {
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
    <div className="w-full space-y-8 animate-in fade-in zoom-in duration-500">
      <form
        className="space-y-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {message && <AlertComponent message={message} />}

        <div className="space-y-4">
          <Controller
            control={methods.control}
            name="email"
            rules={{
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Correo electrónico inválido',
              },
            }}
            render={({ field }) => (
              <div className="space-y-2">
                <Input
                  {...field}
                  label="Correo electrónico"
                  type="email"
                  placeholder="name@company.com"
                  className="rounded-xl border-white/20 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            )}
          />

          <Controller
            control={methods.control}
            name="password"
            rules={{ required: 'La contraseña es requerida' }}
            render={({ field }) => (
              <div className="space-y-2">
                <Input
                  {...field}
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl border-white/20 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            className="w-full rounded-xl h-12 text-base font-bold shadow-lg"
            type="submit"
            disabled={loading}
          >
            Iniciar sesión
          </Button>

          <Link
            href="/forgot-password"
            className="text-center text-sm font-medium text-primary-200 hover:text-white hover:underline transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-white/50 font-bold">O continúa con</span>
        </div>
      </div>

      <div className="space-y-6">
        <Button
          className="w-full flex items-center justify-center gap-3 text-white border-white/20 hover:bg-white/10 rounded-xl h-12 font-bold"
          variant="outline"
          onClick={handleGoogle}
          disabled={loading}
        >
          <Google width="20" height="20" fill="currentColor" />
          Google
        </Button>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-white/40 hover:text-white transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <LoadingPages isOpen={loading} />
    </div>
  )
}

const AlertComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/50 bg-destructive/10 text-destructive animate-in slide-in-from-top-2">
      <p className="text-sm font-semibold">{message}</p>
    </div>
  )
}
