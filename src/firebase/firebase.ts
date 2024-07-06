'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// add firebase auth
import { getAuth } from 'firebase/auth'

// IMPORT VARIABLES FROM .ENV
const API_KEY = process.env.VITE_FIREBASE_API_KEY
const MESSAGE_SENDER_ID = process.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const APP_ID = process.env.VITE_FIREBASE_APP_ID
const PROJECT_ID = process.env.VITE_FIREBASE_MEASUREMENT_ID
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'coniap-iiap.firebaseapp.com',
  projectId: 'coniap-iiap',
  storageBucket: 'coniap-iiap.appspot.com',
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: PROJECT_ID,
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
// add firebase auth
export const auth = getAuth(firebaseApp)
