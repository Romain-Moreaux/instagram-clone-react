import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core'
import { db, storage } from '../../init-firebase'
import { firestore } from 'firebase'
import './imageUpload.css'

function ImageUpload({ username }) {
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

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
              timestamp: firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
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
    <div className="imageUpload">
      <progress
        value={progress}
        max="100"
        className="imageUpload__progressBar"
      />
      <Input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="enter a caption"
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload
