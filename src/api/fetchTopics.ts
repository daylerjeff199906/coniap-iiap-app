const API_URL = process.env.APP_URL_PROD

export async function getTopicsActive() {
  const response = await fetch(`${API_URL}/topics`, {
    headers: {
      'Content-Type': 'application/json',
      apikey: 'tu-api-key-de-supabase', // Reemplaza 'tu-api-key-de-supabase' con tu API key de Supabase
    },
  })
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Error al obtener los datos')
  }
}
