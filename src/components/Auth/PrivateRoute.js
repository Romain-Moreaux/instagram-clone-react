// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

export function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const { isAuth } = useAuth()
  const user = isAuth()
  console.log('Private route: ', user)

  return (
    <Route {...rest}>
      {user ? <Component /> : <Redirect to={redirectTo} />}
    </Route>
  )
}
