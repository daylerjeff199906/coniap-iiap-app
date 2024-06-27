'use client'
import { useState } from 'react'
import { db } from '@/firebase/firebase'
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  DocumentReference,
  getDoc,
} from 'firebase/firestore'
import { IUser } from '@/types'

const convertDataToUser = (data: DocumentData[]): IUser[] => {
  return data?.map((user) => {
    const { email, photo, role, userName } = user
    const id = user?.id
    return {
      id: id,
      email,
      photo,
      userName,
      role,
    }
  })
}

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[] | null>(null)

  const getListUsers = async () => {
    setLoading(true)
    try {
      const usersCollection = collection(db, 'users')
      const usersSnapshot = await getDocs(usersCollection)

      const usersList: DocumentData[] = []

      usersSnapshot.forEach((doc) => {
        usersList.push(doc.data())
      })

      const users = usersSnapshot?.docs?.map((doc) => ({
        id: doc.id.toString(),
        ...doc.data(),
      }))

      setUsers(convertDataToUser(users))
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return {
    loading,
    users,
    getListUsers,
  }
}
