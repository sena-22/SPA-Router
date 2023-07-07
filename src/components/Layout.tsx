import {ReactNode} from 'react'
import Nav from './Nav'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      {children}
      <Nav />
    </main>
  )
}

export default Layout
