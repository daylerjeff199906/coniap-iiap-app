'use client'
import { useState } from 'react'
import { db } from '@/firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function useAcounts() {
  const [accounts, setAccounts] = useState([])

  const auth = getAuth()

  return {}
}
