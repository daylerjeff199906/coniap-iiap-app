'use client'

function createLocalStorage(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data))
}

function deleteLocalStorage(name: string) {
  localStorage.removeItem(name)
}

function getLocalStorage(name: string) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(name)
    return data ? JSON.parse(data) : null
  } else {
    return null
  }
}

export { createLocalStorage, deleteLocalStorage, getLocalStorage }
