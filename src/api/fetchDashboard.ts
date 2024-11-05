'use server'
import { createClient } from '@/utils/supabase/server'
import { count } from 'console'

// export async function createTopic(props: ITopic) {
//   const supabase = createClient()

//   const { data, error } = await supabase
//     .from('topics')
//     .insert([props])
//     .select('*')

//   if (error) {
//     return error
//   } else {
//     return data
//   }
// }

interface IQuery {
  typePerson?: string
  status?: string
}

export async function fetchTotalPersons(query: IQuery) {
  const { typePerson, status } = query
  const supabase = createClient()

  let request = supabase.from('persons').select('id')

  if (typePerson) {
    request = request.eq('typePerson', typePerson)
  }

  if (status) {
    request = request.eq('isActived', status === 'active')
  }

  const { data, error } = await request

  if (error) {
    console.error(error)
    return []
  } else {
    return data
  }
}

type PersonStats = {
  total: number
  actived: number
  inactived: number
}

type PersonStatsResult = {
  [key: string]: PersonStats
}

export async function fetchPersonStats(): Promise<PersonStatsResult> {
  const supabase = createClient()

  const types = ['speaker', 'speaker_mg', 'participant']

  // Crear un objeto para almacenar los resultados
  let result: PersonStatsResult = {}

  // Iterar sobre cada tipo de persona
  for (const type of types) {
    // Realizar la consulta para obtener los datos
    const {
      data,
      error,
      count: total_count,
    } = await supabase
      .from('persons')
      .select('id, typePerson, isActived', { count: 'exact' }) // Asume que tienes los campos 'type' e 'is_active'
      .eq('typePerson', type)

    if (error) {
      console.error(`Error fetching ${type}:`, error)
      result[type] = {
        total: 0,
        actived: 0,
        inactived: 0,
      }
      continue
    }
    // Contar los totales y los estados
    const total = Number(total_count)
    const actived = data.filter((person) => person.isActived).length
    const inactived = Number(total_count) - actived

    // Almacenar los resultados en el objeto
    result[type] = {
      total,
      actived,
      inactived,
    }
  }

  return result
}
