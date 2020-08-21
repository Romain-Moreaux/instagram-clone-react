import React, { useState, useContext } from 'react'
import {
  Button,
  Input,
  IconButton,
  Container,
  Grid,
  CircularProgress,
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { db, storage } from '../init-firebase'
import { firestore } from 'firebase'
import { makeStyles } from '@material-ui/core'
import { UserContext } from '../App'

const useStyles = makeStyles({
  createPostBox: {
    // display: 'flex',
    // flexDirection: 'column',
    marginTop: 'auto',
    paddingTop: '24px',
    paddingBottom: '24px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderTop: '1px solid lightgray',
  },
  form: {
    // display: 'flex',
    // justifyContent: 'center',
    marginTop: '12px',
  },
  input: {
    display: 'none',
  },
  inputText: { width: '40%' },
  progress: {
    marginLeft: '12px',
  },
  button: { marginLeft: '12px' },
})

function CreatePost() {
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const classes = useStyles()
  const user = useContext(UserContext)

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

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
    <div className={classes.createPostBox}>
      <Container maxWidth="md">
        <h3>Add a Post with image.</h3>
        {user ? (
          <Grid
            component="form"
            container
            className={classes.form}
            justify="center"
            alignItems="center"
          >
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
          </Grid>
        ) : (
          <p>Sorry you need to login to upload</p>
        )}
      </Container>
    </div>
  )
}

export default CreatePost
