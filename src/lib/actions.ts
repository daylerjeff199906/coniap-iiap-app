'use server'

import { cookies } from 'next/headers'

async function createCookie(name: string, data: any) {
  //   cookies().set('name', 'lee')
  // or
  //   cookies().set('name', 'lee', { secure: true })
  // or
  cookies().set({
    name: name,
    value: data,
    httpOnly: true,
    path: '/',
  })
}

export { createCookie }
