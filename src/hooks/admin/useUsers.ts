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

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false)

  const geListUsers = async () => {
    setLoading(true)
    try {
      const usersCollection = collection(db, 'users')
      const usersSnapshot = await getDocs(usersCollection)

      const usersList: DocumentData[] = []
      usersSnapshot.forEach((doc) => {
        usersList.push(doc.data())
      })

      console.log(usersList)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return {
    loading,
  }
}
