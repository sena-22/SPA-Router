import {ReactNode} from 'react'
import RouteContextProvider from '../contexts/RouteContext'

const Router = ({children}: {children: ReactNode}) => {
  return <RouteContextProvider>{children}</RouteContextProvider>
}

export default Router
