// dependances
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

// database
import { db } from '../init-firebase'
// auth
import { useAuth } from './Auth'

const useStyles = makeStyles((theme) => ({
  createCommentBox: {
    ...theme.displays.flexWrap,
    padding: theme.spacing(1, 2),
    borderTop: theme.borders[0],
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 0,
    resize: 'none',
  },

  button: {
    flex: 0,
    border: 'none',
    color: theme.palette.primary.blue,
    fontWeight: 600,
    backgroundColor: 'transparent',
    outline: 0,
    '&:disabled': {
      opacity: '.3',
    },
  },
}))

function CreateComment({ postId }) {
  const { user } = useAuth()
  const [comment, setComment] = useState('')

  const classes = useStyles()

  const CreateComment = (e) => {
    e.preventDefault()

    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        username: user.displayName,
        usernameId: user.uid,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log(`Comment on post ${postId} successfully send!`)
      })
      .catch(function (error) {
        console.error(`Error sending comment on post ${postId} `, error)
      })
    setComment('')
  }

  return (
    <form className={classes.createCommentBox}>
      <input
        className={classes.input}
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="add a comment..."
      />
      <button
        type="submit"
        onClick={CreateComment}
        disabled={!comment}
        className={classes.button}
      >
        comment
      </button>
    </form>
  )
}

export default CreateComment
