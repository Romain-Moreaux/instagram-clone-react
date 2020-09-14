// dependances
import React, { useState } from 'react'
import {
  makeStyles,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
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
    flexBasis: '100%',
    backgroundColor: theme.palette.background.paper,
    border: theme.borders[0],
    padding: theme.spacing(2, 3),
    margin: theme.spacing(3, 0),
    borderRadius: 4,
  },
  input: {
    display: 'none',
  },
  inputText: { width: '100%', marginBottom: theme.spacing(3) },
  submit: {
    backgroundColor: theme.palette.primary.blue,
    fontWeight: 500,
    color: theme.palette.background.paper,
    marginLeft: 'auto',
  },
  progress: {
    marginLeft: theme.spacing(2),
    position: 'relative',
    borderRadius: '50%',
    ...theme.displays.flexCenter,
    alignItems: 'center',
    '& span': { position: 'absolute', fontSize: 14 },
  },
  button: { marginLeft: theme.spacing(2) },
  message: { marginTop: theme.spacing(2) },
  preview: {
    display: 'flex',
    border: theme.borders[0],
    borderRadius: 4,
    padding: 5,
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    '& img': { width: 250, objectFit: 'cover' },
  },
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
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const history = useHistory()
  const { user } = useAuth()
  const $post = usePost()

  const handleUpload = (e) => {
    e.preventDefault()
    if (!image || !caption) return setError('caption or image is missing')
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
            const response = await $post.create(caption, url)
            console.log('response', response)
            if (response.success) {
              setProgress(0)
              setCaption('')
              setImage(null)
              history.push(`/${user.displayName}`)
            } else {
              setError(response.error.message)
            }
          })
      }
    )
  }

  const handleChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setImage(file)
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
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
          <Button
            size="small"
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
          </Button>
        </label>
        <div className={classes.progress}>
          <CircularProgress size={50} variant="static" value={progress} />
          {progress > 0 && <span>{progress} %</span>}
        </div>

        <Button
          variant="contained"
          color="primary"
          disabled={!caption || !image}
          onClick={handleUpload}
          size="small"
          classes={{ contained: classes.submit }}
        >
          Share
        </Button>
      </form>
      <span className={classes.textError}>{error}</span>
      {imagePreview && (
        <div className={classes.preview}>
          <img src={imagePreview} alt="" />
        </div>
      )}
    </>
  )
}
