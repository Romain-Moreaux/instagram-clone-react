import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { auth } from '../init-firebase'

const useStyles = makeStyles({
  header: {
    height: '60px',
    backgroundColor: 'white',
    padding: '10px',
    borderBottom: '1px solid lightgray',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  logo: {
    display: 'flex',
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    '&:first-of-type': {
      marginLeft: 'auto',
      marginRight: '10px',
    },
  },

  user: {
    alignSelf: 'center',
    marginLeft: '10px',
  },
})

function Header({ user, setOpenSignUp, setOpenSignIn }) {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img src={InstaLogo} alt="" className={classes.image} />
      </div>
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
    </div>
  )
}

export default Header
