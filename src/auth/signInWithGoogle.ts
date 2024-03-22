'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { createCookie } from '@/lib'
import { toast } from 'sonner'

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const firestore = getFirestore()
    const usersRef = collection(firestore, 'users')
    const q = query(usersRef, where('email', '==', user.email))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      toast.error('No tiene acceso a la plataforma. Contacte al administrador.')
      return
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // const newData = JSON.stringify(data)
        const dataGoogle = {
          email: user.email,
          userName: user.displayName,
          photo: user.photoURL,
          role: data.role,
        }
        console.log(dataGoogle)
        createCookie('user', JSON.stringify(dataGoogle))
        // createLocalStorage('user', data)

        // if (data.role === 'admin') {
        //   window.location.href = '/admin'
        // } else {
        //   window.location.href = '/'
        // }
      })
    }
    // Verificar el rol del usuario después de iniciar sesión
    // Suponiendo que tengas un campo de rol en la información del usuario
    // if (user) {
    //   const tokenResult = await user.getIdTokenResult()
    //   console.log(tokenResult)
    //   createCookie('token', tokenResult.token)
    //   createCookie('currentUser', tokenResult.claims)
    //   // console.log(tokenResult)
    //   //add to cookie
    //   const isAdmin = tokenResult.claims.role === 'admin'

    //   // console.log(isAdmin)
    //   if (isAdmin) {
    //     // El usuario es un administrador, redirigir al panel de administración
    //     // Aquí puedes redirigir a la página de administración o realizar otras acciones adecuadas
    //   } else {
    //     // El usuario no es un administrador, mostrar un mensaje de error o redirigir a una página de acceso denegado
    //   }
    // }
  } catch (error) {
    console.error(error)
  }
}
