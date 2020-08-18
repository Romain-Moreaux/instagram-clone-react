import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import avatarImg from '../images/avatar1.jpg'
import { db } from '../init-firebase'
import { firestore } from 'firebase'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as CommentSvg } from '../images/comment.svg'
import { ReactComponent as LikeSvg } from '../images/like.svg'
import { ReactComponent as ShareSvg } from '../images/share.svg'
import { ReactComponent as SaveSvg } from '../images/save.svg'
import { ReactComponent as CirclesSvg } from '../images/circles.svg'

const useStyles = makeStyles({
  post: {
    maxWidth: '500px',
    backgroundColor: 'white',
    border: '1px solid lightgray',
    marginBottom: '45px',
    borderRadius: '3px',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
  },
  text: {
    fontWeight: 400,
    padding: '10px 0',
  },
  textUsername: {
    fontWeight: 600,
  },

  avatar: {
    marginRight: '10px',
  },
  menu: {
    marginLeft: 'auto',
    border: 0,
    backgroundColor: 'transparent',
  },
  imageBox: {
    borderBottom: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    display: 'flex',
  },
  image: {
    width: '100%',
    objectFit: 'contain',
  },

  body: {
    padding: '16px',
  },
  iconsBox: {
    display: 'flex',
    '& svg': {
      marginRight: '8px',
    },
    '& svg:last-child': {
      marginLeft: 'auto',
    },
  },
  commentCount: {
    color: '#00376b',
  },
  commentText: {
    padding: '5px 0',
  },

  commentUsername: {
    color: ' #262626',
    fontWeight: 600,
    marginRight: '6px',
  },
  commentItem: {
    display: 'flex',
  },
  commentBox: {
    display: 'flex',
    padding: '12px 16px',
    borderTop: '1px solid lightgray',
  },
  datetime: {
    color: '#8e8e8e',
    fontSize: '10px',
    textTransform: 'uppercase',
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

function Post({
  user,
  postId,
  imageUrl,
  username,
  caption,
  timestamp,
  ouwnerId,
}) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setAnchorEl2(null)
  }

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

  const postComment = (e) => {
    e.preventDefault()

    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add({
        username: user.displayName,
        userId: user.uid,
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

  const deletePost = (e) => {
    e.preventDefault()

    db.collection('posts')
      .doc(postId)
      .delete()
      .then(function () {
        console.log(`Document ${postId} successfully deleted!`)
      })
      .catch(function (error) {
        console.error(`Error removing document: ${postId} `, error)
      })
  }
  const updatePost = (e) => {}
  const deleteComment = (e, id) => {
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

  const reportInapropriate = (postId) => {}
  const unfollow = (ouwnerId) => {}

  const diffDaysFromTimestamps = (oTimestamp, cTimestamp) => {
    var diffTime = Math.abs(oTimestamp * 1000 - cTimestamp)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  let nDays = diffDaysFromTimestamps(timestamp?.seconds, Date.now())

  console.log('comments', comments)
  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <Avatar
          src={avatarImg}
          alt="Romain Moreaux"
          className={classes.avatar}
        />
        <h3>{username}</h3>
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
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          {user?.uid === ouwnerId
            ? [
                <MenuItem key={0} onClick={deletePost}>
                  Delete my post
                </MenuItem>,
                <MenuItem key={1} onClick={updatePost}>
                  Update my post
                </MenuItem>,
              ]
            : [
                <MenuItem key={0} onClick={reportInapropriate}>
                  Report inapropriate
                </MenuItem>,
                <MenuItem key={1} onClick={unfollow}>
                  Unfollow
                </MenuItem>,
              ]}
        </Menu>
      </div>
      <div className={classes.imageBox}>
        <img className={classes.image} src={imageUrl} alt="" />
      </div>
      <section className={classes.body}>
        <div className={classes.iconsBox}>
          <LikeSvg />
          <CommentSvg />
          <ShareSvg />
          <SaveSvg />
        </div>
        <h4 className={classes.text}>
          <span className={classes.textUsername}>{username} :</span> {caption}
        </h4>
        <p className={classes.commentCount}>
          There are {comments.length || 'no '} comments
        </p>
        <div className={classes.commentList}>
          {comments.map(({ comment, id }) => (
            <div className={classes.commentItem}>
              <p key={id} className={classes.commentText}>
                <span className={classes.commentUsername}>
                  {comment.username}
                </span>
                {comment.text}
              </p>
              {comment?.userId === user?.uid ? (
                <>
                  <button
                    className={classes.menu}
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                  >
                    <CirclesSvg />
                  </button>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleCloseMenu}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={(e) => deleteComment(e, id)}>
                      Delete my comment
                    </MenuItem>
                  </Menu>
                </>
              ) : null}
            </div>
          ))}
        </div>
        <time
          className={classes.datetime}
          dateTime={new Date(timestamp?.seconds * 1000).toUTCString()}
        >{`${nDays} ${nDays > 1 ? `days` : `day`} ago`}</time>
      </section>
      {user && (
        <form className={classes.commentBox}>
          <input
            className={classes.input}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add a comment..."
          />
          <button
            type="submit"
            onClick={postComment}
            disabled={!comment}
            className={classes.button}
          >
            comment
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
