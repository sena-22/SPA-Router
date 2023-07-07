import {useContext} from 'react'
import {RouteState, useRouter} from '../react-router-dom'

const Nav = () => {
  const navList = [
    {to: '/', name: 'go main '},
    {to: '/about', name: 'about'},
  ]
  const pathname = useContext(RouteState)
  const {to = '', name} = navList.find((nav) => nav.to !== pathname) || {}
  const {push} = useRouter()

  return (
    <nav>
      <button onClick={() => push(to)}>{name}</button>
    </nav>
  )
}

export default Nav
