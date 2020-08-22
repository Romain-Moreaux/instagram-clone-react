import React from 'react'
import { Avatar, makeStyles, Grid, Container } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { auth } from '../init-firebase'

const useStyles = makeStyles({
  header: {
    backgroundColor: 'white',
    padding: '12px 0',
    borderBottom: '1px solid lightgray',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
  },
  navigation: {
    display: 'flex',
    marginLeft: 'auto',
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
    height: '29px',
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    '&:first-of-type': {
      marginRight: '10px',
    },
  },
})

function Header({ user, setOpenSignUp, setOpenSignIn }) {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <div className={classes.menu}>
        <div className={classes.logo}>
          <img src={InstaLogo} alt="" className={classes.image} />
        </div>
        <nav className={classes.navigation}>
          {user ? (
            <>
              <button
                className={`${classes.button}`}
                onClick={() => auth.signOut()}
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
  )
}

export default Header
