import { IError } from './types'

export function getErrors(error: IError) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'El correo electrónico ya está en uso'
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido'
    case 'auth/weak-password':
      return 'La contraseña es débil'
    case 'auth/user-not-found':
      return 'El usuario no se encontró'
    case 'auth/wrong-password':
      return 'La contraseña es incorrecta'
    case 'auth/user-disabled':
      return 'El usuario ha sido deshabilitado'
    case 'auth/invalid-credential':
      return 'Credenciales no válidas'
    default:
      return error.message
  }
}
