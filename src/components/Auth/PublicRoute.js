// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

export function PublicRoute({ component: Component, ...rest }) {
  const { isAuth } = useAuth()
  let user = isAuth()
  console.log('Public route', user)

  return (
    <Route {...rest}>
      {!user ? <Component /> : <Redirect to={`/${user.displayName}`} />}
    </Route>
  )
}
