import {useContext} from 'react'
import {RouteState} from '../react-router-dom'

export const useRouteState = () => {
  const state = useContext(RouteState)
  if (!state) throw new Error('RouteState not found')
  return state
}
