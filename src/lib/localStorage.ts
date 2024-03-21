'use client'

async function createLocalStorage(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data))
}

async function deleteLocalStorage(name: string) {
  localStorage.removeItem(name)
}

async function getLocalStorage(name: string) {
  return localStorage.getItem(name)
}

export { createLocalStorage, deleteLocalStorage, getLocalStorage }
