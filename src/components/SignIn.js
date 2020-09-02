// dependances
import React, { useState } from 'react'
import { Input, Button, makeStyles } from '@material-ui/core'
// images
import InstaLogo from '../images/logo_insta.png'
import { useAuth } from './Auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formModal: {
    ...theme.displays.flexColumn,
  },
  logo: { objectFit: 'contain' },
  form: {
    ...theme.displays.flexCenter,
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  inputText: { width: '40%' },
  progress: {
    marginLeft: theme.spacing(2),
  },
  button: { marginLeft: theme.spacing(2) },
  message: { marginTop: theme.spacing(2) },
}))

function SignIn() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signin } = useAuth()

  const _handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await signin(email, password)
      console.log('response', response)
      if (!response.success) console.log(response.error)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className={classes.paper}>
      <form className={classes.formModal}>
        <img src={InstaLogo} alt="" className={classes.logo} />
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={_handleSignIn}>Sign In</Button>
      </form>
    </div>
  )
}

export default SignIn
