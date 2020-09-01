import React, { useContext, useState } from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { ReactComponent as AddSvg } from '../images/add.svg'
// import { auth } from '../init-firebase'
// import { UserContext } from '../App'
import { SignUp, SignIn, AddPost } from './Modals'
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
  // const user = useContext(UserContext)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openAddPost, setOpenAddPost] = useState(false)
  const auth = useAuth()

  return (
    <>
      <SignUp setOpen={setOpenSignUp} open={openSignUp} />
      <SignIn setOpen={setOpenSignIn} open={openSignIn} />
      <AddPost setOpen={setOpenAddPost} open={openAddPost} />
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={InstaLogo} alt="" className={classes.image} />
          </div>
          <nav className={classes.navigation}>
            {auth.user ? (
              <>
                <button
                  className={classes.button}
                  onClick={() => setOpenAddPost(true)}
                >
                  <AddSvg />
                </button>
                <button
                  className={`${classes.button}`}
                  onClick={() => auth.signout()}
                >
                  Logout
                </button>
                <Avatar
                  src={avatarImg}
                  alt="Romain Moreaux"
                  className={classes.user}
                />
              </>
            ) : (
              <>
                <button
                  className={`${classes.button}`}
                  onClick={() => setOpenSignUp(true)}
                >
                  Sign up
                </button>
                <button
                  className={`${classes.button}`}
                  onClick={() => setOpenSignIn(true)}
                >
                  Sign In
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
