// dependances
import React, { useState } from 'react'
import {
  makeStyles,
  Input,
  IconButton,
  Button,
  CircularProgress,
  TextareaAutosize,
  TextField,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import uniqid from 'uniqid'
// database
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { db, storage } from '../../init-firebase'
// components
import NavBottom from '../navigation/NavMobile'
import Header from '../Header'
// custom hooks
import { useAuth } from '../auth'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 0, 7),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  pageTitle: {
    flexBasis: '100%',
    ...theme.widgets.title,
  },
  form: {
    ...theme.displays.flexWrap,
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: theme.borders[0],
    flex: 1,
    padding: theme.spacing(2, 3),
    marginTop: theme.spacing(3),
    borderRadius: 4,
  },
  input: {
    display: 'none',
  },
  inputText: { flex: 1 },
  submit: {
    backgroundColor: theme.palette.primary.blue,
    fontWeight: 500,
    color: theme.palette.background.paper,
  },
  uploadBtn: { margin: theme.spacing(0, 2) },
  progress: {
    marginLeft: theme.spacing(2),
  },
  button: { marginLeft: theme.spacing(2) },
  message: { marginTop: theme.spacing(2) },
}))

export function PostCreate() {
  const classes = useStyles()
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
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              author: auth.user?.displayName,
              authorId: auth.user?.uid,
            })
            setProgress(0)
            setCaption('')
            setImage(null)
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
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <h1 className={classes.pageTitle}>Write a new post</h1>
          <form className={classes.form}>
            <TextField
              multiline
              className={classes.inputText}
              classes={{ focused: classes.focused }}
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              label="caption"
            />
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="icon-button-file" className={classes.uploadBtn}>
              <IconButton
                color="inherit"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Button
              variant="contained"
              color="inherit"
              disabled={!image}
              onClick={handleUpload}
              size="small"
              classes={{ contained: classes.submit }}
            >
              Share
            </Button>
            <CircularProgress
              className={classes.progress}
              variant="static"
              value={progress}
            />
          </form>
        </div>
      </div>
      <NavBottom />
    </>
  )
}
