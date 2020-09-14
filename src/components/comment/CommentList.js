// dependances
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Comment from '.'
// database
import { db } from '../../init-firebase'
import { useComment } from './useComment'

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
  const [comments, setComments] = useState()
  const classes = useStyles()
  const $comment = useComment()

  useEffect(() => {
    if (!comments) {
      console.log('no comments')
      let unsubscribe = $comment.getCollection(postId, setComments)

      return () => unsubscribe()
    }
  }, [$comment, comments, postId])
  console.log('CommentList', comments)
  return (
    <div className={classes.commentsBox}>
      <p className={classes.commentCount}>
        {comments?.length
          ? comments.length > 1
            ? `${comments.length} comments`
            : `${comments.length} comment`
          : 'no comment'}
      </p>
      <div className={classes.commentList}>
        {comments?.map(({ comment, id }) => {
          console.log('comment', comment)
          return <Comment key={id} postId={postId} id={id} comment={comment} />
        })}
      </div>
    </div>
  )
}
