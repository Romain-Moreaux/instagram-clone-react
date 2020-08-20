import React, { useState, useContext } from 'react'
import { Button, Input, IconButton } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { db, storage } from '../init-firebase'
import { firestore } from 'firebase'
import { makeStyles } from '@material-ui/core'
import { UserContext } from '../App'

const useStyles = makeStyles({
  createPostBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderTop: '1px solid lightgray',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    display: 'none',
  },
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
      {user ? (
        <form className={classes.form}>
          <LinearProgress variant="determinate" max="100" value={progress} />
          <Input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="enter a caption"
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
          >
            Upload
          </Button>
        </form>
      ) : (
        <p>Sorry you need to login to upload</p>
      )}
    </div>
  )
}

export default CreatePost
