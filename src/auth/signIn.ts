'use client'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { IUser } from '@/types'
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

    if (querySnapshot.empty) {
      console.log('No matching documents.')
      return
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as IUser
        // console.log('Document data:', data)
        const newData = JSON.stringify(data)
        createCookie('user', newData)
        if (data.role === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/'
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
}
