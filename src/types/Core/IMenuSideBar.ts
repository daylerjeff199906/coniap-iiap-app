export interface IMenuItem {
  id: string
  title: string
  href?: string | null
  icon?: string
  moreItems?: IMenuItem[]
}

export interface IMenuSideBar {
  id: string
  section: string
  items: IMenuItem[]
}
