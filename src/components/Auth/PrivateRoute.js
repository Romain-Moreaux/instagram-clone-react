// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

export function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const { isAuth } = useAuth()
  const isLogged = isAuth()
  console.log('Private route: ', isLogged)

  return (
    <Route {...rest}>
      {isLogged ? <Component /> : <Redirect to={redirectTo} />}
    </Route>
  )
}
