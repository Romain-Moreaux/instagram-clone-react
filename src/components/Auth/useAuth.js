import React, { useState, useContext, useEffect } from 'react'
import authContext from './context'
import { auth } from '../../init-firebase'

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const signin = (email, password) => {
    console.log('Signin')
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
        return {
          success: true,
        }
      })
      .catch((error) => {
        return {
          success: false,
          error,
        }
      })
  }

  const signup = (email, password) => {
    console.log('Signup')
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('response', response)
        setUser(response.user)
        return {
          success: true,
          user: response.user,
        }
      })
      .catch((error) => {
        return {
          success: false,
          error,
        }
      })
  }

  const signout = async () => {
    console.log('signout')
    return auth
      .signOut()
      .then(() => setUser(false))
      .catch((error) => {
        console.log(error)
      })
  }

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true
    })
  }

  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password).then(() => {
      return true
    })
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}
