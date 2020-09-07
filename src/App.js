// dependances
import React from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { customTheme } from './customTheme'
// auth
import AuthController from './components/Auth/AuthControler'
import AuthProvider from './components/Auth'

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: customTheme.palette.background.default,
    color: customTheme.palette.primary.black,
    minHeight: '100vh',
    // Overflow remove sticky position from childrens
    // overflowX: 'hidden',
    ...customTheme.displays.flexColumn,
    ...customTheme.typography.body1,
  },
}))

function App() {
  const classes = useStyles()

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
