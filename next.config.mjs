/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // APP_NAME: process.env.VITE_APP_APP_NAME,
    // API_URL_LOCAL: process.env.VITE_APP_API_URL_LOCAL,
    API_URL_PROD: process.env.APP_API_URL_PROD,
  },
}

export default nextConfig
