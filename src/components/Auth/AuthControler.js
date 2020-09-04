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
import AccountEdit from '../AccountEdit'
import PrivateRoute from './PrivateRoute'

const AuthController = () => {
  const auth = useAuth()
  console.log('user =>', auth?.user)
  return (
    <Router>
      <Switch>
        {/* old version */}
        {/* <Route
          exact
          path="/"
          render={() =>
            auth?.user ? <Dashboard /> : <Redirect to="/signin" />
          }
        />
        <Route
          path="/signin"
          render={() => (!auth?.user ? <SignIn /> : <Redirect to="/" />)}
        />
        <Route
          path="/signup"
          render={() => (!auth?.user ? <SignUp /> : <Redirect to="/" />)}
        /> */}

        {/* <Route path="/">
          <Dashboard />
        </Route> */}
        {/* <PrivateRoute exact user={auth.user} path="/">
          <Dashboard />
        </PrivateRoute> */}
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/account/edit">
          <AccountEdit />
        </Route>
      </Switch>
    </Router>
  )
}

export default AuthController
