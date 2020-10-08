//  dependances
import React from 'react'
import { makeStyles, Menu, MenuItem, Fade } from '@material-ui/core'
// database
import { db } from '../../init-firebase'
// images
import { ReactComponent as CirclesSvg } from '../../images/circles.svg'
// auth
import { useAuth } from '../auth'

const useStyles = makeStyles((theme) => ({
  commentUsername: {
    color: theme.palette.primary.black,
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
  commentItem: {
    display: 'flex',
    margin: theme.spacing(1 / 2, 0),
  },
  commentText: {
    ...theme.typography.caption,
    wordBreak: 'break-word;',
  },
  commentBox: {
    display: 'flex',
    padding: theme.spacing(2),
    borderTop: theme.borders[0],
  },
  menu: {
    marginLeft: 'auto',
    border: 0,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 0,
    resize: 'none',
  },
}))

function Comment({ postId, comment, id }) {
  const classes = useStyles()
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const deleteComment = (e) => {
    e.preventDefault()
    console.log('id =>', id)
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(id)
      .delete()
      .then(function () {
        console.log(`Comment ${id} successfully deleted!`)
      })
      .catch(function (error) {
        console.error(`Error removing comment: ${id} `, error)
      })
  }

  // console.log('comment', comment)
  return (
    <div className={classes.commentItem}>
      <p className={classes.commentText}>
        <span className={classes.commentUsername}>{comment?.username}</span>
        {comment?.text}
      </p>
      {comment?.ownerUid === user?.uid ? (
        <>
          <button
            className={classes.menu}
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <CirclesSvg />
          </button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={deleteComment}>Delete my comment</MenuItem>
          </Menu>
        </>
      ) : null}
    </div>
  )
}

export default Comment
