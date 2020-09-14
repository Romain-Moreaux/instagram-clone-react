// dependances
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
// custom hooks
import { useComment } from './useComment'

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

export function CommentCreate({ postId }) {
  // const { user } = useAuth()
  const $comment = useComment()
  const [comment, setComment] = useState('')

  const classes = useStyles()

  const handleCreateComment = async (e) => {
    e.preventDefault()

    const response = await $comment.create(postId, comment)
    if (response.success) {
      setComment('')
      console.log(`comment created on post ${postId}`)
    } else {
      console.error(
        `Error sending comment on post ${postId} `,
        response.error.message
      )
    }
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
        onClick={handleCreateComment}
        disabled={!comment}
        className={classes.button}
      >
        comment
      </button>
    </form>
  )
}
