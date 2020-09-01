//dependances
import React, { useState } from 'react'
import {
  Button,
  Input,
  IconButton,
  CircularProgress,
  Modal,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { firestore } from 'firebase/app'
import uniqid from 'uniqid'
// database
import { db, storage } from '../init-firebase'
// auth
import { useAuth } from './Auth'

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
  createPostBox: {
    padding: theme.spacing(3, 0),
    backgroundColor: theme.palette.background.paper,
    borderTop: theme.borders[0],
  },
  container: {
    ...theme.wrappers.w1280,
    ...theme.spaces.horizontal.md,
    textAlign: 'center',
  },
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const AddPostModal = ({ setOpen, open, user }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  // console.log('image => ', image)

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}${uniqid()}`).put(image)

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
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              caption: caption,
              imageUrl: url,
              timestamp: firestore.FieldValue.serverTimestamp(),
              author: user?.displayName,
              authorId: user?.uid,
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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <form className={classes.form}>
          <Input
            className={classes.inputText}
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="enter a text..."
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

function CreatePost() {
  const classes = useStyles()
  const { user } = useAuth()

  return (
    <div className={classes.createPostBox}>
      <div className={classes.container}>
        <h3>Add a Post with image.</h3>
        {user ? (
          <AddPostModal user={user} />
        ) : (
          <p className={classes.message}>Sorry you need to login to upload</p>
        )}
      </div>
    </div>
  )
}

export default CreatePost