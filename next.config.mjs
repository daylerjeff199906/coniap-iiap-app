/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // APP_NAME: process.env.VITE_APP_APP_NAME,
    // API_URL_LOCAL: process.env.VITE_APP_API_URL_LOCAL,
    API_URL_PROD: process.env.VITE_APP_API_URL_PROD,
    API_KEY: process.env.VITE_APP_API_KEY,
    API_AUTH: process.env.VITE_APP_API_AUTH,
  },
}

export default nextConfig
