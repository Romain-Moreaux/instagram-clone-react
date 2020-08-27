import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { db } from '../init-firebase'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  commentsBox: {
    padding: theme.spacing(1, 0),
  },
  commentCount: {
    color: theme.palette.primary.greyDark,
  },
  commentList: {
    margin: theme.spacing(1, 0),
  },
}))

function CommentList({ postId }) {
  const [comments, setComments] = useState([])
  const classes = useStyles()

  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          )
        })
    }

    return () => {
      unsubscribe()
    }
  }, [postId])

  return (
    <div className={classes.commentsBox}>
      <p className={classes.commentCount}>
        {comments.length
          ? comments.length > 1
            ? `${comments.length} comments`
            : `${comments.length} comment`
          : 'no comment'}
      </p>
      <div className={classes.commentList}>
        {comments.map(({ comment, id }) => (
          <Comment key={id} postId={postId} id={id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default CommentList
