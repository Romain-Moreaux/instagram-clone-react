import { useState, useContext, useEffect } from 'react'
import authContext from './context'
import { auth } from '../../init-firebase'

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const signin = (email, password) => {
    console.log('signin()')
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
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

  const signup = (email, password) => {
    console.log('signup()')
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
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
    console.log('signout()')
    return auth
      .signOut()
      .then(() => {
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

  const isAuth = () => localStorage.getItem('signin')

  // // Subscribe to user on mount
  // // Because this sets state in the callback it will cause any ...
  // // ... component that utilizes this hook to re-render with the ...
  // // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('authChanged', user)
      if (user) {
        localStorage.setItem('signin', true)
        setUser(user)
      } else {
        setUser(null)
        localStorage.removeItem('signin')
      }
    })

    // Cleanup subscription on unmount
    return () => {
      console.log('unmount')
      unsubscribe()
    }
  }, [])

  // Return the user object and auth methods
  return {
    user,
    isAuth,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}
