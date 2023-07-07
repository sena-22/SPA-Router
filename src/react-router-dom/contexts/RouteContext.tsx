import {type Dispatch, ReactNode, createContext, useState, useEffect} from 'react'

export const RouteState = createContext<string>(location.pathname)
export const RouteDispatch = createContext<Dispatch<string>>(() => {})

const RouteContextProvider = ({children}: {children: ReactNode}) => {
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    const handlePathname = () => {
      setPathname(location.pathname)
    }
    addEventListener('popstate', handlePathname)
    return () => removeEventListener('popstate', handlePathname)
  }, [setPathname])

  return (
    <RouteState.Provider value={pathname}>
      <RouteDispatch.Provider value={setPathname}>{children}</RouteDispatch.Provider>
    </RouteState.Provider>
  )
}

export default RouteContextProvider
