export async function sendResetPasswordEmail(email: string) {
  try {
    return 'Email sent'
  } catch (error) {
    return error
  }
}
