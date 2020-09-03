import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useAuth } from './useAuth'

// import PrivateRoute from './PrivateRoute'
import Dashboard from '../Dashboard'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const AuthController = () => {
  const auth = useAuth()
  console.log('user =>', auth?.user)
  return (
    <Router>
      <Switch>
        <Route
          path="/signin"
          render={() => (!auth?.user ? <SignIn /> : <Redirect to="/" />)}
        />
        <Route
          path="/signup"
          render={() => (!auth?.user ? <SignUp /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/"
          render={() =>
            auth?.user ? <Dashboard /> : <Redirect to="/signin" />
          }
        />
        {/* <PrivateRoute exact path="/" user={auth.user}>
          <Dashboard />
        </PrivateRoute> */}
      </Switch>
    </Router>
  )
}

export default AuthController
