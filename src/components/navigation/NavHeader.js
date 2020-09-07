// dependances
import React, { useState } from 'react'
import { Avatar, makeStyles, MenuItem, Menu, Fade } from '@material-ui/core'
// images
import avatarImg from '../../images/avatar1.jpg'
import { ReactComponent as AddSvg } from '../../images/add.svg'
import { ReactComponent as SettingsSvg } from '../../images/settings.svg'
import { ReactComponent as HomeSvg } from '../../images/home.svg'
// components
import { AddPost } from '../Modals'
// auth
import { useAuth } from '../Auth'
import { useHistory, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  navigation: {
    ...theme.displays.hideOnMobile,
    ...theme.displays.flexAlignCenter,
    marginLeft: 'auto',
  },

  paper: {
    ...theme.widgets.popover.menu,
    marginTop: theme.spacing(2),
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    marginLeft: theme.spacing(3),
  },
}))

function NavHeader() {
  const classes = useStyles()
  const [openAddPost, setOpenAddPost] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const { signout } = useAuth()
  const history = useHistory()

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      const response = await signout()
      if (response.success) {
        console.log('successful logged out')
        history.push('signin')
      } else alert(response.error.message)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <AddPost setOpen={setOpenAddPost} open={openAddPost} />
      <nav className={classes.navigation}>
        <Link to="/">
          <HomeSvg />
        </Link>
        <button className={classes.button} onClick={() => setOpenAddPost(true)}>
          <AddSvg />
        </button>
        <button
          className={classes.button}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar
            src={avatarImg}
            alt="Romain Moreaux"
            className={classes.user}
          />
        </button>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          TransitionComponent={Fade}
          classes={{ paper: classes.paper }}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem key={0}>
            <Link to="/account/edit" onClick={() => console.log('clicked')}>
              <SettingsSvg /> Settings
            </Link>
          </MenuItem>
          <MenuItem key={1} onClick={handleSignOut}>
            Logout
          </MenuItem>
        </Menu>
      </nav>
    </>
  )
}

export default NavHeader
