'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// add firebase auth
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAl-3I574JF14zfaCgtkE6U6OrGsYQb9_c',
  authDomain: 'coniap-iiap.firebaseapp.com',
  projectId: 'coniap-iiap',
  storageBucket: 'coniap-iiap.appspot.com',
  messagingSenderId: '443032108527',
  appId: '1:443032108527:web:e810f87fb40fc5ad028a1a',
  measurementId: 'G-Z4R4EY00Y1',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
// add firebase auth
export const auth = getAuth(firebaseApp)
