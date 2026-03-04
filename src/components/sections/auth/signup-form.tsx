'use client';

import React from 'react';
import { signup } from '@/app/[locale]/(auth)/signup/actions';
import { PasswordStrength } from '@/components/auth/password-strength';
import { PasswordInput } from './password-input';
import { useTranslations, useLocale } from 'next-intl';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, type ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters."),
    lastName: z.string().min(2, "Last name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
    const t = useTranslations('Auth');
    const locale = useLocale();
    const [isPending, setIsPending] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [serverError, setServerError] = React.useState<string>('');

    const [checks, setChecks] = React.useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handlePasswordChange = (val: string) => {
        setChecks({
            length: val.length >= 8,
            uppercase: /[A-Z]/.test(val),
            lowercase: /[a-z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[^A-Za-z0-9]/.test(val),
        });
    };

    const onSubmit = async (data: SignupFormValues) => {
        setIsPending(true);
        setServerError('');

        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);

        try {
            const result = await signup(formData);

            if (result?.success) {
                setSuccess(true);
            } else if (result?.message) {
                setServerError(result.message);
            } else if ((result?.errors as any)?.form) {
                setServerError((result.errors as any).form[0]);
            } else if (result?.errors) {
                for (const key in result.errors) {
                    if (Object.prototype.hasOwnProperty.call(result.errors, key)) {
                        const fieldErrors = result.errors[key as keyof typeof result.errors] as string[];
                        if (fieldErrors && Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                            form.setError(key as keyof SignupFormValues, {
                                type: 'server',
                                message: fieldErrors[0],
                            });
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setServerError('An unexpected error occurred');
        } finally {
            setIsPending(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-8 py-10"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <div className="relative flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full border-4 border-primary/20">
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                </div>

                <div className="space-y-3 max-w-sm">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                        {t('accountCreated') || 'Cuenta Creada'}
                    </h2>
                    <p className="text-zinc-400 text-lg font-light leading-relaxed">
                        {t('checkEmailConfirm') || 'Revisa tu bandeja de entrada para verificar tu cuenta.'}
                    </p>
                </div>

                <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                    <p className="text-sm text-zinc-300">
                        {t('emailSentNote') || 'Si no recibes el correo en unos minutos, revisa tu carpeta de spam.'}
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 w-full">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'firstName'> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={t('firstNamePlaceholder') || 'First Name'}
                                        {...field}
                                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'lastName'> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={t('lastNamePlaceholder') || 'Last Name'}
                                        {...field}
                                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'email'> }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t('emailPlaceholder') || 'Email'}
                                    type="email"
                                    {...field}
                                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'password'> }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    placeholder={t('passwordPlaceholder') || 'Password'}
                                    {...field}
                                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                                    disabled={isPending}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handlePasswordChange(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <PasswordStrength checks={checks} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }: { field: ControllerRenderProps<SignupFormValues, 'confirmPassword'> }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    placeholder={t('confirmPasswordPlaceholder') || 'Confirm Password'}
                                    {...field}
                                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {serverError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <Alert variant="destructive" className="rounded-xl bg-destructive/10 border-destructive/20 text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                <Button
                    type="submit"
                    className="h-14 rounded-xl bg-primary text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(var(--primary),0.2)]"
                    disabled={isPending}
                >
                    {isPending ? <Loader2 className="animate-spin" /> : (t('createAccount') || 'Create Account')}
                </Button>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black px-4 text-zinc-500 font-bold tracking-widest">
                            {t('or') || 'OR'}
                        </span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="h-14 rounded-xl border-white/10 hover:bg-white hover:text-black transition-all duration-300 font-bold"
                    disabled={isPending}
                    onClick={async () => {
                        setIsPending(true);
                        const { loginWithGoogle } = await import('@/app/[locale]/(auth)/login/actions');
                        await loginWithGoogle(locale);
                    }}
                >
                    <svg className="mr-3 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    {t('loginWithGoogle') || 'Continue with Google'}
                </Button>
            </form>
        </Form>
    );
}
