export interface ISponsor {
  id: string | number
  name: string
  image: string
  isActived: boolean
  created_at: string
}

export interface IEventSponsor {
  id: string
  main_event_id?: string
  edition_id?: string
  sponsor_id: string | number
  order_index: number
  created_at: string
  sponsors?: ISponsor
}
