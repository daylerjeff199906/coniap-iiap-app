'use client'

function createLocalStorage(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data))
}

function deleteLocalStorage(name: string) {
  localStorage.removeItem(name)
}

function getLocalStorage(name: string) {
  localStorage.getItem(name)
  return JSON.parse(localStorage.getItem(name) || '{}')
}

export { createLocalStorage, deleteLocalStorage, getLocalStorage }
