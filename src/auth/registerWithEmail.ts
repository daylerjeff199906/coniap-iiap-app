import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'

interface IError {
  code: string
  message: string
}

interface ICredentials {
  email: string
  password: string
}

export async function registerAndSendEmailVerification(props: ICredentials) {
  const { email, password } = props

  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Enviar correo de verificación
    await sendEmailVerification(userCredential.user)

    // Devolver el usuario creado
    return userCredential.user
  } catch (error) {
    const err = error as unknown as IError
    if (err.code === 'auth/email-already-in-use') {
      return 'El correo ya está en uso'
    } else if (err.code === 'auth/invalid-email') {
      return 'El correo no es válido'
    } else if (err.code === 'auth/weak-password') {
      return 'La contraseña es débil'
    } else {
      return err.message
    }
  }
}

export async function registerWithEmail(props: ICredentials) {
  const { email, password } = props

  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Devolver el usuario creado
    return userCredential.user
  } catch (error) {
    const err = error as unknown as IError
    if (err.code === 'auth/email-already-in-use') {
      return 'El correo ya está en uso'
    } else if (err.code === 'auth/invalid-email') {
      return 'El correo no es válido'
    } else if (err.code === 'auth/weak-password') {
      return 'La contraseña es débil'
    } else {
      return err.message
    }
  }
}
