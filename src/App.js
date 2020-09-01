// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { customTheme } from './customTheme'
// auth
import { AuthProvider } from './components/Auth/useAuth'
// components
import PostList from './components/PostList'
import Aside from './components/Aside'
import Header from './components/Header'

// console.log(customTheme)

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

function App() {
  // const [user, setUser] = useState(null)
  const classes = useStyles()

  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <div className={classes.app}>
          <Header />
          <div className={classes.main}>
            <div className={classes.container}>
              <PostList />
              <Aside />
            </div>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
