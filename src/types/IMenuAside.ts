export interface IMenuAside {
  id: string
  nameOption: string
  titleOption: string | null
  hrefLink: string | null
  icon: React.ReactNode
  subItems: ISubMenu[] | null
}

export interface ISubMenu {
  id: string
  nameOption: string
  titleOption: string | null
  url: string
}
