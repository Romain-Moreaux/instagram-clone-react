// dependances
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core'
// images
import avatarImg from '../../images/avatar1.jpg'
import { ReactComponent as CommentSvg } from '../../images/comment.svg'
import { ReactComponent as LikeSvg } from '../../images/like.svg'
import { ReactComponent as ShareSvg } from '../../images/share.svg'
import { ReactComponent as SaveSvg } from '../../images/save.svg'
import { ReactComponent as CirclesSvg } from '../../images/circles.svg'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'
//components
import { CommentCreate } from '../comment'
import { CommentList } from '../comment'
import { useAuth } from '../auth'
import { usePost } from './usePost'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  post: {
    flex: '1 0 100%',
    backgroundColor: 'white',
    border: theme.borders[0],
    borderRadius: '3px',
    marginBottom: theme.spacing(5),
    '&:last-of-type': { marginBottom: 0 },
  },

  header: {
    ...theme.displays.flexAlignCenter,
    padding: theme.spacing(2),
  },
  text: {
    fontWeight: 400,
    margin: theme.spacing(1, 0),
  },
  textUsername: {
    fontWeight: 600,
  },

  avatar: {
    marginRight: theme.spacing(1),
  },
  menu: {
    marginLeft: 'auto',
    border: 0,
    backgroundColor: 'transparent',
  },
  menuList: {
    padding: 0,
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      display: 'flex',
    },
  },
  icon: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    color: theme.palette.primary.black,
    marginRight: theme.spacing(1),
  },
  imageBox: {
    borderBottom: theme.borders[0],
    borderTop: theme.borders[0],
    display: 'flex',
  },
  image: {
    width: '100%',
    objectFit: 'contain',
  },

  body: {
    padding: theme.spacing(2),
  },
  iconsBox: {
    display: 'flex',
    '& svg': {
      marginRight: theme.spacing(1),
    },
    '& svg:last-child': {
      marginLeft: 'auto',
    },
  },
  datetime: {
    color: theme.palette.primary.greyDark,
    ...theme.typography.smallCaps,
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

function Post({
  postId,
  imageUrl,
  author,
  caption,
  timestamp,
  ownerUid,
  setPostList,
}) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { user } = useAuth()
  const $post = usePost()

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const response = await $post.delete(postId)
      if (response.success) {
        console.log(`Document ${postId} successfully deleted!`)
        $post.getCollection(setPostList)
      } else {
        console.error(`Error removing document: ${postId} `, response.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
              classes={{ list: classes.menuList }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              TransitionComponent={Fade}
            >
              {user?.uid === ownerUid
                ? [
                    <MenuItem key={0} onClick={handleDelete}>
                      <DeleteIcon classes={{ root: classes.icon }} /> Delete my
                      post
                    </MenuItem>,
                    <MenuItem key={1}>
                      <NavLink
                        to={`/${user?.displayName}/post/${postId}/update`}
                      >
                        <UpdateIcon classes={{ root: classes.icon }} /> Update
                        my post
                      </NavLink>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key={0} onClick={() => {}}>
                      Report inapropriate
                    </MenuItem>,
                    <MenuItem key={1} onClick={() => {}}>
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
      {user && user.uid !== ownerUid && <CommentCreate postId={postId} />}
    </div>
  )
}

export default Post
