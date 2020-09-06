import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import AccountEdit from '../AccountEdit'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AuthController = () => {
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
          path="/account/edit"
          component={AccountEdit}
          redirectTo="/signin"
        />
        <Route path="*" component={() => <p>404 not found</p>} />
      </Switch>
    </Router>
  )
}

export default AuthController
