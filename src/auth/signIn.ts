'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { createCookie } from '@/lib'

interface ILogin {
  email: string
  password: string
}

export const signInWithCredentials = async (props: ILogin) => {
  const auth = getAuth()
  const firestore = getFirestore()
  const { email, password } = props

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    const usersRef = collection(firestore, 'users')
    const q = query(usersRef, where('email', '==', user.email))
    const querySnapshot = await getDocs(q)
    console.log('querySnapshot', querySnapshot)

    if (querySnapshot.empty) {
      console.log('No matching documents.')
      return
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
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
