// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Comment from '.'
// custom hooks
import { useFirestoreSubscribe } from '../hooks'
import { db } from '../../init-firebase'

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

export function CommentList({ postId }) {
  const classes = useStyles()
  const { data, status, error } = useFirestoreSubscribe(
    db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
  )

  return (
    <div className={classes.commentsBox}>
      {status === 'error' ? (
        <p>{error.message}</p>
      ) : status === 'loading' ? (
        <p>Loading ...</p>
      ) : (
        <>
          <p className={classes.commentCount}>
            {data?.length
              ? data.length > 1
                ? `${data.length} comments`
                : `${data.length} comment`
              : 'no comment'}
          </p>
          <div className={classes.commentList}>
            {data?.map((comment) => {
              return (
                <Comment key={comment.id} postId={postId} comment={comment} />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
