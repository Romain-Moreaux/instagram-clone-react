import React, { useState } from 'react'
import InstaLogo from '../images/logo_insta.png'
import { auth } from '../init-firebase'
import { Modal, makeStyles, Button, Input } from '@material-ui/core'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export const SignUp = ({ setOpen, open }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const _handleSignUp = (e) => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({ displayName: username })
      )
      .catch((error) => alert(error.message))
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <img src={InstaLogo} alt="" className="app__headerImage" />
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button onClick={_handleSignUp}>Sign Up</Button>
        </form>
      </div>
    </Modal>
  )
}

export const SignIn = ({ setOpen, open }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const _handleSignIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <img src={InstaLogo} alt="" className="app__headerImage" />
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
    </Modal>
  )
}
