// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './useAuth'

function PublicRoute({ component: Component, redirectTo, ...rest }) {
  const { isAuth } = useAuth()
  const isLogged = isAuth()
  console.log('Public route: ', isLogged)

  return (
    <Route {...rest}>
      {!isLogged ? <Component /> : <Redirect to={redirectTo} />}
    </Route>
  )
}

export default PublicRoute
