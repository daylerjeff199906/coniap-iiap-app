'use client'

import * as React from 'react'
import { useForm, type ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { login, loginWithGoogle } from './actions'
import { PasswordInput } from '@/components'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(1),
    rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const searchParams = useSearchParams()
    const t = useTranslations('Auth')
    const locale = useLocale()
    const router = useRouter()
    const [error, setError] = React.useState<string>('')
    const [isPending, setIsPending] = React.useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setIsPending(true)
        setError('')

        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        try {
            const nextPath = searchParams.get('next') || undefined
            const result = await login(formData, locale, nextPath)

            if (result?.error) {
                setError(result.error)
            } else if (result?.redirectUrl) {
                router.push(result.redirectUrl)
            }
        } catch (err) {
            console.error(err)
            setError('An unexpected error occurred')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="mx-auto grid gap-6 w-full max-w-sm h-fit">
            <div className="grid gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('login')}</h1>
                <p className="text-muted-foreground text-sm">
                    {t('loginDescription')}
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {t.has(`Errors.${error}`) ? t(`Errors.${error}`) : error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: ControllerRenderProps<LoginFormValues, 'email'> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={t('emailPlaceholder')}
                                        type="email"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }: { field: ControllerRenderProps<LoginFormValues, 'password'> }) => (
                            <FormItem>
                                <div className="flex items-center justify-end">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-primary underline-offset-4 hover:underline"
                                    >
                                        {t('forgotPassword')}?
                                    </Link>
                                </div>
                                <FormControl>
                                    <PasswordInput
                                        placeholder={t('passwordPlaceholder')}
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }: { field: ControllerRenderProps<LoginFormValues, 'rememberMe'> }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <Label
                                    htmlFor="rememberMe"
                                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {t('rememberMe')}
                                </Label>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('logIn')}
                    </Button>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                {t('or') || 'O'}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled={isPending}
                        onClick={async () => {
                            setIsPending(true)
                            await loginWithGoogle(locale)
                        }}
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        {t('loginWithGoogle')}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                {t('dontHaveAccount')}{" "}
                <Link href="/signup" className="underline text-primary">
                    {t('signup')}
                </Link>
            </div>
        </div>
    )
}
