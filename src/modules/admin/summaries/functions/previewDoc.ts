export const cleanUrl = (fileUrl: string) => fileUrl.split('?')[0]

export const getFileType = (fileUrl: string) => {
  const cleanedUrl = cleanUrl(fileUrl)
  const extension = cleanedUrl.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') {
    const nameWithoutExt = cleanedUrl.substring(0, cleanedUrl.lastIndexOf('.'))
    const originalExtension = nameWithoutExt.split('.').pop()?.toLowerCase()
    if (originalExtension === 'doc' || originalExtension === 'docx') {
      return 'word'
    }
    return 'pdf'
  }
  return 'unknown'
}
