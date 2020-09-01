import React, { useState, useContext } from 'react'
import InstaLogo from '../images/logo_insta.png'
import { auth, db, storage } from '../init-firebase'
import {
  Modal,
  makeStyles,
  Button,
  Input,
  IconButton,
  CircularProgress,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { generateUserDocument } from '../firebase'
import { firestore } from 'firebase'
import uniqid from 'uniqid'
import { useAuth } from './Auth'
// import { UserContext } from '../App'

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

export const SignUp = ({ setOpen, open }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const _handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await user.updateProfile({
        displayName: username,
        followers: [],
        likes: [],
      })
      generateUserDocument(user, 'subscribers')
    } catch (error) {
      console.log('Error Signing up with email and password', error.message)
    }
    setUsername('')
    setEmail('')
    setPassword('')
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
        <form className={classes.formModal}>
          <img src={InstaLogo} alt="" className={classes.logo} />
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
  const { user, signin } = useAuth()
  console.log('user =>', user)

  const _handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await signin(email, password)
      console.log('response', response)
      if (response.success) {
        setEmail('')
        setPassword('')
        setOpen(false)
      } else {
        console.log(response.error)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // const _handleSignIn = (e) => {
  //   e.preventDefault()

  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((error) => alert(error.message))

  //   setEmail('')
  //   setPassword('')
  //   setOpen(false)
  // }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
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
    </Modal>
  )
}

export const AddPost = ({ setOpen, open }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  // const user = useContext(UserContext)
  const auth = useAuth()

  // console.log('image => ', image)

  const handleUpload = (e) => {
    // Generate a unique name for each image to avoid conflict when loading posts
    const uniqImageName = `${image.name}${uniqid()}`

    const uploadTask = storage.ref(`images/${uniqImageName}`).put(image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        setProgress(progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(uniqImageName)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              caption: caption,
              imageUrl: url,
              timestamp: firestore.FieldValue.serverTimestamp(),
              author: auth.user?.displayName,
              authorId: auth.user?.uid,
            })
            setProgress(0)
            setCaption('')
            setImage(null)
            setOpen(false)
          })
      }
    )
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h3>Add a Post with image.</h3>
        <form className={classes.form}>
          <Input
            className={classes.inputText}
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="enter a caption..."
          />
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera className={classes.cameraImage} />
            </IconButton>
          </label>
          <Button
            variant="contained"
            color="primary"
            disabled={!image}
            onClick={handleUpload}
            size="small"
          >
            Upload
          </Button>
          <CircularProgress
            className={classes.progress}
            variant="static"
            value={progress}
          />
        </form>
      </div>
    </Modal>
  )
}
