import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'

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
    console.log(userCredential)

    // Enviar correo de verificación
    const res = await sendEmailVerification(userCredential.user)
    console.log(res)

    // Devolver el usuario creado
    return userCredential.user
  } catch (error) {
    console.error(error)
    throw error
  }
}
