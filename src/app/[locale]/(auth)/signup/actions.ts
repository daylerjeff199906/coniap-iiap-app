'use server'

import { createClient } from '@/utils/supabase/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const SignupSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignupState = {
    errors?: {
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
        form?: string[]
    }
    message?: string
    success?: boolean
} | null

export async function signup(formData: FormData) {
    const validatedFields = SignupSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please resolve errors.'
        }
    }

    const { firstName, lastName, email, password } = validatedFields.data

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Get the current locale from headers or default to 'es'
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/auth/callback?next=/dashboard`,
        },
    })

    if (error) {
        return {
            errors: {
                form: [error.message],
            },
            message: 'Could not create account.',
        }
    }

    return {
        success: true,
        message: 'Success! Please check your email to confirm your account.'
    }
}
