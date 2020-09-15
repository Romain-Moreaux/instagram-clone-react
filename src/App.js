// dependances
// dependances
import React from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
// theme
import { customTheme } from './customTheme'
// providers
import AuthProvider, { AuthController } from './components/auth'

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
