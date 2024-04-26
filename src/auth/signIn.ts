'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { fetchPersonByEmail, createPerson } from '@/api'
import { IError } from './types'

import { IPerson, IUser } from '@/types'
// import { createCookie, createLocalStorage } from '@/lib'
import { toast } from 'sonner'

interface ILogin {
  email: string
  password: string
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
        const person: IPerson = (await fetchPersonByEmail(
          userCredential.user.email as string
        )) as IPerson
        if (person) {
          const userData: IUser = {
            id: person.id as string,
            email: userCredential.user.email || '',
            userName: person.name || '',
            photo: person.image || '',
            role: person.typePerson || '',
          }
          return userData
        } else {
          const newPerson: IPerson = {
            email: userCredential.user.email || '',
            name: userCredential.user.displayName || '',
            surName: '',
            image: userCredential.user.photoURL || '',
            typePerson: 'speaker',
            institution: '',
            presentation: '',
            isActived: true,
            location: '',
            phone: '',
            job: '',
            created_at: new Date().toISOString(),
          }
          const personCreated = await createPerson(newPerson)
            .then((res) => res)
            .catch((err) => err)
          if (personCreated) {
            const userData: IUser = {
              id: personCreated[0].id,
              email: userCredential.user.email || '',
              userName: userCredential.user.displayName || '',
              photo: userCredential.user.photoURL || '',
              role: 'speaker',
            }
            return userData
          } else {
            toast.error('No se pudo crear el usuario')
            return null
          }
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
    } else if (err.code === 'auth/too-many-requests') {
      toast.error('Demasiados intentos fallidos. Intente más tarde')
      return null
    } else if (err.code === 'auth/user-disabled') {
      toast.error('El usuario ha sido deshabilitado')
      return null
    } else if (err.code === 'auth/invalid-email') {
      toast.error('El correo no es válido')
      return null
    } else if (err.code === 'auth/email-already-in-use') {
      toast.error('El correo ya está en uso')
      return null
    } else if (err.code === 'auth/invalid-credential') {
      toast.error('Credenciales no válidas')
      return null
    } else {
      toast.error('Error desconocido', { description: err.message })
      return null
    }
  }
}
