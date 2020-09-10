import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { PublicRoute, PrivateRoute } from './'
import Settings from '../pages/Settings'
import UserPostCreate from '../pages/UserPostCreate'
import UserPostUpdate from '../pages/UserPostUpdate'

export const AuthController = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/signin" component={SignIn} />
        <PublicRoute path="/signup" component={SignUp} />
        <PrivateRoute
          exact
          path="/:username"
          component={Dashboard}
          redirectTo="/signin"
        />
        <PrivateRoute
          path="/:username/account"
          component={Settings}
          redirectTo="/signin"
        />
        <PrivateRoute
          exact
          path="/:username/post/create"
          component={UserPostCreate}
          redirectTo="/signin"
        />
        <PrivateRoute
          exact
          path="/:username/post/:postId/update"
          component={UserPostUpdate}
          redirectTo="/signin"
        />
        <Route path="*" component={() => <p>404 not found</p>} />
      </Switch>
    </Router>
  )
}
