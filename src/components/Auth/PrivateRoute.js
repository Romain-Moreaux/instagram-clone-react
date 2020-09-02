// dependances
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ children, user, ...rest }) {
  console.log('Private route: ', user)
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/signin" />)}
    />
  )
}

export default PrivateRoute
