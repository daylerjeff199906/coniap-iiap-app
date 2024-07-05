'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { fetchUserByEmail } from '@/api'
import { IError } from './types'

import { IUser } from '@/types'
// import { createCookie, createLocalStorage } from '@/lib'
import { toast } from 'sonner'
import { getErrors } from './getErrors'

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
      // //Busco en la tabla users si existe el usuario
      // const usersRef = collection(firestore, 'users')
      // const q = query(usersRef, where('email', '==', userCredential.user.email))
      // const querySnapshot = await getDocs(q)

      //Se busca si existe la persona en la tabla person
      const user: IUser | null = (await fetchUserByEmail(
        userCredential.user.email as string
      )) as IUser | null

      let userData: IUser | null = null
      // if (querySnapshot.empty) {
      //   userData = {
      //     id: person.id as string,
      //     userName: person.name || '',
      //     email: userCredential.user.email || '',
      //     photo: person.image || '',
      //     role: null,
      //     person: person,
      //   }
      // } else {
      //   userData = {
      //     id: querySnapshot.docs[0].id,
      //     userName: userCredential.user.displayName || '',
      //     email: userCredential.user.email || '',
      //     photo: userCredential.user.photoURL || '',
      //     role: querySnapshot.docs[0].data().role || '',
      //     person: person,
      //   }
      // }
      return userData
    } else {
      console.log(userCredential.user.emailVerified)
      toast.error('Revise su correo electrónico para verificar su cuenta', {
        position: 'top-right',
      })
      return null
    }
  } catch (error) {
    const err = error as unknown as IError
    toast.error(getErrors(err), { position: 'top-right' })
    return null
  }
}
