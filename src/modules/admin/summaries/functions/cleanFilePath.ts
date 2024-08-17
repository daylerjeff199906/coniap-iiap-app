export function cleanFilePath(url: string): string {
  const startPattern = 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/files%2FR'
  const endPattern = '?alt='

  // Eliminar la parte inicial
  if (url.startsWith(startPattern)) {
    url = url.substring(startPattern.length)
  }

  // Eliminar todo a partir de "alt="
  const endIndex = url.indexOf(endPattern)
  if (endIndex !== -1) {
    url = url.substring(0, endIndex)
  }

  return url
}
