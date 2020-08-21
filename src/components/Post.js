// dependances
import React, { useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core'
// bdd
import { db } from '../init-firebase'
// images
import avatarImg from '../images/avatar1.jpg'
import { ReactComponent as CommentSvg } from '../images/comment.svg'
import { ReactComponent as LikeSvg } from '../images/like.svg'
import { ReactComponent as ShareSvg } from '../images/share.svg'
import { ReactComponent as SaveSvg } from '../images/save.svg'
import { ReactComponent as CirclesSvg } from '../images/circles.svg'
//context
import { UserContext } from '../App'
//components
import PostComment from './CreateComment'
import CommentList from './CommentList'

const useStyles = makeStyles({
  post: {
    // maxWidth: '500px',
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
    margin: '6px 0',
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

function Post({ postId, imageUrl, author, caption, timestamp, authorId }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const user = useContext(UserContext)

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

  const reportInapropriate = (postId) => {}

  const unfollow = (authorId) => {}

  const diffDaysFromTimestamps = (oTimestamp, cTimestamp) => {
    var diffTime = Math.abs(oTimestamp * 1000 - cTimestamp)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  let nDays = diffDaysFromTimestamps(timestamp?.seconds, Date.now())

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <Avatar
          src={avatarImg}
          alt="Romain Moreaux"
          className={classes.avatar}
        />
        <h3>{author}</h3>
        {user && (
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
              {user?.uid === authorId
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
          </>
        )}
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
          <span className={classes.textUsername}>{author} :</span> {caption}
        </h4>
        <CommentList postId={postId} />
        <time
          className={classes.datetime}
          dateTime={new Date(timestamp?.seconds * 1000).toUTCString()}
        >{`${nDays} ${nDays > 1 ? `days` : `day`} ago`}</time>
      </section>
      {user && user.uid !== authorId && <PostComment postId={postId} />}
    </div>
  )
}

export default Post
