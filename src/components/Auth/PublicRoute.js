// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

export function PublicRoute({ component: Component, redirectTo, ...rest }) {
  const { isAuth, getUsername } = useAuth()
  console.log('Public route')

  return (
    <Route {...rest}>
      {!isAuth() ? <Component /> : <Redirect to={`/${getUsername()}`} />}
    </Route>
  )
}
