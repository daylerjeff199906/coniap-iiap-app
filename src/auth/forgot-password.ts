import { getAuth, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

export async function sendResetPasswordEmail(email: string) {
  try {
    await sendPasswordResetEmail(auth, email)
    return 'Email sent'
  } catch (error) {
    return error
  }
}
