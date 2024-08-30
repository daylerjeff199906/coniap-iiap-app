import { IResCookie } from '@/types'
import { getCookie } from '@/lib'

export const getUser = async () => {
  const res: IResCookie = (await getCookie(`user`)) as IResCookie

  const user = JSON.parse(res.value)

  return user
}
