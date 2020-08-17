import React from 'react'
import { Avatar } from '@material-ui/core'
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { auth } from '../init-firebase'

function Header({ user, setOpenSignUp, setOpenSignIn }) {
  return (
    <div className="app__header">
      <div className="app__logo">
        <img src={InstaLogo} alt="" className="app__headerImage" />
      </div>
      {user ? (
        <>
          <button
            className="app__headerButton logout"
            onClick={() => auth.signOut()}
          >
            Logout
          </button>
          <Avatar
            src={avatarImg}
            alt="Romain Moreaux"
            className="post__avatar"
          />
        </>
      ) : (
        <>
          <button
            className="app__headerButton signup"
            onClick={() => setOpenSignUp(true)}
          >
            Sign up
          </button>
          <button
            className="app__headerButton signin"
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
