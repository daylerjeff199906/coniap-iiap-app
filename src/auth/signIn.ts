'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { fetchPersonByEmail } from '@/api'

import { IPerson, IUser } from '@/types'
// import { createCookie, createLocalStorage } from '@/lib'
import { toast } from 'sonner'

interface ILogin {
  email: string
  password: string
}

interface IError {
  code: string
  message: string
}

export const signInWithCredentials = async (
  props: ILogin
): Promise<IUser | null> => {
  const auth = getAuth()
  const firestore = getFirestore()
  const { email, password } = props

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    if (userCredential.user.emailVerified) {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('email', '==', userCredential.user.email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        const person: IPerson = await fetchPersonByEmail(
          userCredential.user.email as string
        )
        if (person) {
          const userData: IUser = {
            id: person.id,
            email: userCredential.user.email || '',
            userName: person.name || '',
            photo: person.image || '',
            role: person.typePerson || '',
          }
          return userData
        } else {
          toast.error(
            'No tiene acceso a la plataforma. Contacte al administrador.'
          )
          return null
        }
      } else {
        let userData: IUser | null = null
        for (const doc of querySnapshot.docs) {
          const data = doc.data()
          userData = {
            id: doc.id,
            email: userCredential.user.email || '',
            userName: userCredential.user.displayName || '',
            photo: userCredential.user.photoURL || '',
            role: data.role || '',
          }
          break // Solo necesitamos el primer documento
        }
        new Promise((resolve) => setTimeout(resolve, 1000))
        return userData as IUser
      }
    } else {
      toast.error('Revise su correo electrónico para verificar su cuenta')
      return null
    }
  } catch (error) {
    const err = error as unknown as IError
    if (err.code === 'auth/user-not-found') {
      toast.error('El usuario no existe')
      return null
    } else if (err.code === 'auth/wrong-password') {
      toast.error('La contraseña es incorrecta')
      return null
    } else {
      toast.error('Error desconocido', { description: err.message })
      return null
    }
  }
}
