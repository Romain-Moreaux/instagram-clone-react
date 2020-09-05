import React from 'react'
import { useProvideAuth } from './useAuth'
import authContext from './context'

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
const AuthProvider = ({ children }) => {
  const authValue = useProvideAuth()
  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}

export default AuthProvider
