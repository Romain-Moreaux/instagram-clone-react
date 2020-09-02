// dependances
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { customTheme } from './customTheme'
// auth
import AuthController from './components/Auth/AuthControler'
import AuthProvider from './components/Auth'

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <AuthController />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
