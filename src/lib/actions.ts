'use server'

import { cookies } from 'next/headers'

async function createCookie(name: string, data: any) {
  cookies().set({
    name: name,
    value: data,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

async function deleteCookie(name: string) {
  cookies().set({
    name: name,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
}

async function getCookie(name: string) {
  return cookies().get(name)
}

export { createCookie, deleteCookie, getCookie }
