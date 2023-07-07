import {useContext} from 'react'
import {RouteDispatch} from '../contexts/RouteContext'

export const useRouter = () => {
  const setPathname = useContext(RouteDispatch)

  const push = (path: string) => {
    setPathname(path)
    window.history.pushState({}, '', path)
  }

  return {push}
}
