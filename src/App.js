import React, { useState, useEffect, createContext } from 'react'
import { auth } from './init-firebase'
import CreatePost from './components/CreatePost'
import { SignUp, SignIn } from './components/authModals'
import Header from './components/Header'
import { makeStyles } from '@material-ui/core'
import PostList from './components/PostList'
import Aside from './components/Aside'

const useStyles = makeStyles({
  app: {
    backgroundColor: '#fafafa',
  },
  main: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  aside: {
    marginLeft: '20px',
  },
})

// Contexte d’utilisateur
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [user])

  console.log('user', user)
  return (
    <div className={classes.app}>
      <UserContext.Provider value={user}>
        <SignUp setOpen={setOpenSignUp} open={openSignUp} />
        <SignIn setOpen={setOpenSignIn} open={openSignIn} />

        <Header
          user={user}
          setOpenSignIn={setOpenSignIn}
          setOpenSignUp={setOpenSignUp}
        />
        <div className={classes.main}>
          <PostList />
          <Aside position="right" />
        </div>
        <CreatePost user={user} />
      </UserContext.Provider>
    </div>
  )
}

export default App
