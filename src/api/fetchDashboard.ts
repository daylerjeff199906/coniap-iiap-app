'use server'
import { createClient } from '@/utils/supabase/server'

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
