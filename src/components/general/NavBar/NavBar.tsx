import { NavBarAdmin, NavBarUser } from './variants'
interface IProps {
  variant?: 'user' | 'admin'
}
export const NavBar = (props: IProps) => {
  const { variant } = props
  return <>{variant === 'admin' ? <NavBarAdmin /> : <NavBarUser />}</>
}
