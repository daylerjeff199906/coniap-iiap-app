/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL_PROD: process.env.VITE_API_URL_PROD,
    API_KEY: process.env.VITE_APP_API_KEY,
    API_AUTH: process.env.VITE_APP_API_AUTH,
    PASSWORD: process.env.VITE_PASSWORD_DEFAULT,
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
    VITE_FIREBASE_MEASUREMENT_ID: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
}

export default nextConfig
