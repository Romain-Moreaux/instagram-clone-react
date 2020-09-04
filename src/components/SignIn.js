// dependances
import React, { useState, useEffect } from 'react'
import { Button, makeStyles } from '@material-ui/core'
// images
import instagramLogo from '../images/logo_insta.png'
import smartphonesImg from '../images/bg-mockup-smartphones.png'
import { useAuth } from './Auth'
import { Link, Redirect, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colLeft: {
    ...theme.spaces.vertical.md,
    ...theme.displays.hideOnMobile,
  },
  colRight: {
    ...theme.spaces.vertical.md,
    flexBasis: '100%',
    [theme.breakpoints.up('sm')]: { flexBasis: '325px' },
  },
  sliderBox: {
    display: 'flex',
  },

  formBox: {
    flex: 1,
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 3,
      border: theme.borders[0],
      '&:last-of-type': { marginTop: theme.spacing(2) },
    },
    '&:first-of-type': {
      position: 'relative',
    },
  },
  smartphonesImg: {
    maxHeight: 500,
    marginLeft: '-30px',
  },
  logo: { objectFit: 'contain', maxHeight: 50 },
  form: {
    ...theme.displays.flexColumn,
    marginTop: theme.spacing(2),
  },
  field: {
    position: 'relative',
    display: 'flex',
    height: 40,
    marginTop: theme.spacing(1),
  },
  label: {
    position: 'absolute',
    transform: 'translate(8px, 2px)',
    fontSize: 10,
    color: theme.palette.primary.greyDark,
  },
  input: {
    ...theme.widgets.inputs.primary,
    flex: 'auto',
    padding: theme.spacing(2, 1, 0),
  },
  toggler: {
    backgroundColor: 'transparent',
    border: 0,
    outline: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    padding: theme.spacing(1),
    cursor: 'pointer',
    fontWeight: 600,
  },
  submit: {
    ...theme.widgets.buttons.primary,
    margin: theme.spacing(2, 0),
  },
  textSignup: {
    fontSize: 13,
    '& a': {
      textDecoration: 'none',
      fontWeight: 600,
      color: theme.palette.primary.blue,
    },
  },
  linkPasswordReset: {
    ...theme.displays.flexCenter,
    fontSize: 12,
    textDecoration: 'none',
    color: theme.palette.primary.greyDark,
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  textError: {
    color: theme.palette.primary.red,
    fontSize: 12,
    position: 'absolute',
    left: 0,
    right: 0,
  },
}))

function SignIn() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signin, user } = useAuth()
  const [isShow, setIsShow] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await signin(email, password)
      if (response.success) console.log('successful logged')
      else setError(response.error.message)
    } catch (error) {
      console.log('error', error)
    }
  }

  const togglePassword = (e) => {
    e.preventDefault()
    setIsShow(!isShow)
  }

  useEffect(() => {
    if (user) history.push('/')
  }, [user, history])

  return (
    <div className={classes.page}>
      <div className={classes.colLeft}>
        <div className={classes.sliderBox}>
          <img className={classes.smartphonesImg} src={smartphonesImg} alt="" />
        </div>
      </div>
      <div className={classes.colRight}>
        <div className={classes.formBox}>
          <img src={instagramLogo} alt="" className={classes.logo} />
          <form className={classes.form}>
            <div className={classes.field}>
              <span className={classes.label}>Email</span>
              <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.field}>
              <span className={classes.label}>Password</span>
              <input
                placeholder="password"
                className={classes.input}
                type={isShow ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={classes.toggler} onClick={togglePassword}>
                {isShow ? 'Hide' : 'Show'}
              </button>
            </div>

            <Button className={classes.submit} onClick={handleSignIn}>
              Log In
            </Button>
          </form>
          <span className={classes.textError}>{error}</span>
          <Link className={classes.linkPasswordReset} to="passwordReset">
            Forgor password?
          </Link>
        </div>
        <div className={classes.formBox}>
          <p className={classes.textSignup}>
            Don't have an account? <Link to="signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
