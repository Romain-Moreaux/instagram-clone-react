// dependances
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
// images
import smartphonesImg from '../../images/bg-mockup-smartphones.png'
// custom hooks
import { useAuth } from '../auth'
import { generateUserDocument } from '../../firebase'
import { Logo, Submit } from '../widgets'

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
  submit: { margin: theme.spacing(2, 0) },
  textSignup: {
    fontSize: 13,
    '& a': {
      textDecoration: 'none',
      fontWeight: 600,
      color: theme.palette.primary.blue,
    },
  },
  textError: {
    color: theme.palette.primary.red,
    fontSize: 12,
    position: 'absolute',
    left: 0,
    right: 0,
  },
}))

function SignUp() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const history = useHistory()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await signup(email, password)
      if (response.success) {
        console.log('Succesful signed up')
        await response.user.updateProfile({
          displayName: username,
        })
        console.log('User succesful updated')
        await generateUserDocument(response.user, 'subscribers')
        history.push(`/${response?.user?.displayName}`)
      } else {
        setError(response.error.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const togglePassword = (e) => {
    e.preventDefault()
    setIsShow(!isShow)
  }

  return (
    <div className={classes.page}>
      <div className={classes.colLeft}>
        <div className={classes.sliderBox}>
          <img className={classes.smartphonesImg} src={smartphonesImg} alt="" />
        </div>
      </div>
      <div className={classes.colRight}>
        <div className={classes.formBox}>
          <Logo />
          <form className={classes.form}>
            <div className={classes.field}>
              <span className={classes.label}>Username</span>
              <input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classes.input}
              />
            </div>
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
            <Submit
              handleDisabled={!email || !password || !username}
              css={classes.submit}
              callback={handleSignUp}
              label="Sign up"
            />
          </form>
          <span className={classes.textError}>{error}</span>
        </div>
        <div className={classes.formBox}>
          <p className={classes.textSignup}>
            Already have an account? <Link to="signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
