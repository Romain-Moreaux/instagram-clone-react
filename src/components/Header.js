// dependances
import React, { useState } from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
// images
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { ReactComponent as AddSvg } from '../images/add.svg'
// components
import { AddPost } from './Modals'
// auth
import { useAuth } from './Auth'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
    borderBottom: theme.borders[0],
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar,
  },
  container: {
    ...theme.displays.flexAlignCenter,
    ...theme.wrappers.w1280,
    ...theme.spaces.horizontal.md,
  },
  logo: {
    display: 'flex',
  },
  navigation: {
    display: 'flex',
    marginLeft: 'auto',
  },
  user: {
    marginLeft: theme.spacing(2),
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
    height: 29,
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    '&:first-of-type': {
      marginRight: theme.spacing(2),
    },
  },
}))

function Header() {
  const classes = useStyles()
  const [openAddPost, setOpenAddPost] = useState(false)
  const { signout, user } = useAuth()

  return (
    <>
      <AddPost setOpen={setOpenAddPost} open={openAddPost} />
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={InstaLogo} alt="" className={classes.image} />
          </div>
          <nav className={classes.navigation}>
            {user && (
              <>
                <button
                  className={classes.button}
                  onClick={() => setOpenAddPost(true)}
                >
                  <AddSvg />
                </button>
                <button
                  className={`${classes.button}`}
                  onClick={() => signout()}
                >
                  Logout
                </button>
                <Avatar
                  src={avatarImg}
                  alt="Romain Moreaux"
                  className={classes.user}
                />
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
