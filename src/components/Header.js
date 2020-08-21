import React from 'react'
import { Avatar, makeStyles, Grid, Container } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { auth } from '../init-firebase'

const useStyles = makeStyles({
  header: {
    // maxHeight: '60px',
    backgroundColor: 'white',
    padding: '12px 0',
    borderBottom: '1px solid lightgray',
    // display: 'flex',
    // justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  logo: {
    // display: 'flex',
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
      // marginLeft: 'auto',
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
    <header className={classes.header}>
      <Container maxWidth="md">
        <Grid container alignItems="center">
          <Grid item className={classes.logo} xs={4}>
            <img src={InstaLogo} alt="" className={classes.image} />
          </Grid>
          <Grid container item xs={8} justify="flex-end">
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
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default Header
