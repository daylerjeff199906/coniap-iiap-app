'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    // Verificar el rol del usuario después de iniciar sesión
    // Suponiendo que tengas un campo de rol en la información del usuario
    if (user) {
      const tokenResult = await user.getIdTokenResult()
      // console.log(tokenResult)
      //add to cookie
      const isAdmin = tokenResult.claims.role === 'admin'

      // console.log(isAdmin)
      if (isAdmin) {
        // El usuario es un administrador, redirigir al panel de administración
        // Aquí puedes redirigir a la página de administración o realizar otras acciones adecuadas
      } else {
        // El usuario no es un administrador, mostrar un mensaje de error o redirigir a una página de acceso denegado
      }
    }
  } catch (error) {
    console.error(error)
  }
}
