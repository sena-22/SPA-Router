import {ReactNode, useContext} from 'react'
import {RouteState} from '../contexts/RouteContext'
import Layout from '../../components/Layout'

interface RouteProps {
  path: string | null
  component: ReactNode
}

const Route = ({path, component}: RouteProps) => {
  const pathname = useContext(RouteState)
  if (pathname === path) {
    return <Layout>{component}</Layout>
  }
}

export default Route
