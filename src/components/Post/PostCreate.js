// dependances
import React, { useState } from 'react'
import {
  makeStyles,
  IconButton,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import uniqid from 'uniqid'
// database
import { storage } from '../../init-firebase'
// custom hooks
import { usePost } from './usePost'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../auth'

const useStyles = makeStyles((theme) => ({
  form: {
    ...theme.displays.flexWrap,
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: theme.borders[0],
    flexBasis: '100%',
    padding: theme.spacing(2, 3),
    margin: theme.spacing(3, 0),
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
  textError: {
    color: theme.palette.primary.red,
    flex: 1,
    textAlign: 'center',
  },
}))

export function PostCreate() {
  const classes = useStyles()
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const post = usePost()
  const history = useHistory()
  const { getUsername } = useAuth()

  const handleUpload = (e) => {
    e.preventDefault()
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
          .then(async (url) => {
            const response = await post.create(caption, url)
            console.log('response', response)
            if (response.success) {
              setProgress(0)
              setCaption('')
              setImage(null)
              history.push(`/${getUsername()}`)
            } else {
              setError(response.error.message)
            }
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
      <span className={classes.textError}>{error}</span>
    </>
  )
}
