'use server'

import { cookies } from 'next/headers'

async function createCookie(name: string, data: any) {
  cookies().set({
    name: name,
    value: data,
    httpOnly: true,
    path: '/',
  })
}

export { createCookie }
