import React, { useState, useEffect, createContext } from 'react'
import { auth } from './init-firebase'
// import CreatePost from './components/CreatePost'
import Header from './components/Header'
import { makeStyles } from '@material-ui/core'
import PostList from './components/PostList'
import Aside from './components/Aside'
import { ThemeProvider } from '@material-ui/core/styles'
import { customTheme } from './customTheme'

console.log(customTheme)

const useStyles = makeStyles({
  app: {
    backgroundColor: customTheme.palette.background.default,
    color: customTheme.palette.primary.black,
    minHeight: '100vh',
    overflowX: 'hidden',
    ...customTheme.displays.flexColumn,
    ...customTheme.typography.body1,
  },
  main: {
    margin: customTheme.spacing(5, 'auto'),
  },
  container: {
    ...customTheme.displays.flexWrap,
    ...customTheme.wrappers.w1280,
    ...customTheme.spaces.horizontal.md,
  },
})

// Context d’utilisateur
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    console.log('user', user)

    return () => unsubscribe()
  }, [user])

  return (
    <ThemeProvider theme={customTheme}>
      <UserContext.Provider value={user}>
        <div className={classes.app}>
          <Header />
          <div className={classes.main}>
            <div className={classes.container}>
              <PostList />
              <Aside />
            </div>
          </div>
          {/* <CreatePost user={user} /> */}
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
