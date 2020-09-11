// dependances
import React from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { customTheme } from './customTheme'
// auth
import { AuthController } from './components/auth'
import AuthProvider from './components/auth'

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: customTheme.palette.background.default,
    color: customTheme.palette.primary.black,
    minHeight: '100vh',
    paddingTop: 56,
    ...customTheme.displays.flexColumn,
    ...customTheme.typography.body1,
  },
}))

function App() {
  const classes = useStyles()
  console.log(customTheme)

  return (
    <div className={classes.app}>
      <ThemeProvider theme={customTheme}>
        <AuthProvider>
          <AuthController />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
