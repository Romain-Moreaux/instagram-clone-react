import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { PublicRoute, PrivateRoute } from './'
import Settings from '../pages/Settings'

export const AuthController = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/signin" component={SignIn} redirectTo="/" />
        <PublicRoute path="/signup" component={SignUp} redirectTo="/" />
        <PrivateRoute
          exact
          path="/"
          component={Dashboard}
          redirectTo="/signin"
        />
        <PrivateRoute
          path="/account"
          component={Settings}
          redirectTo="/signin"
        />
        <Route path="*" component={() => <p>404 not found</p>} />
      </Switch>
    </Router>
  )
}
