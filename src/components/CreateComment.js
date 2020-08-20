import React, { useContext, useState } from 'react'
import { UserContext } from '../App'
import { makeStyles } from '@material-ui/core'
import { db } from '../init-firebase'
import { firestore } from 'firebase'

const useStyles = makeStyles({
  createCommentBox: {
    display: 'flex',
    padding: '12px 16px',
    borderTop: '1px solid lightgray',
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
    color: '#0095f6',
    fontWeight: 600,
    backgroundColor: 'transparent',
    outline: 0,
    '&:disabled': {
      opacity: '.3',
    },
  },
})

function CreateComment({ postId }) {
  const user = useContext(UserContext)
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
        timestamp: firestore.FieldValue.serverTimestamp(),
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