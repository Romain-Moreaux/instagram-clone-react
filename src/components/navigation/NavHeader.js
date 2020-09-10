// dependances
import React, { useState } from 'react'
import { Avatar, makeStyles, MenuItem, Menu, Fade } from '@material-ui/core'
// images
import avatarImg from '../../images/avatar1.jpg'
import { ReactComponent as AddSvg } from '../../images/add.svg'
import { ReactComponent as SettingsSvg } from '../../images/settings.svg'
import { ReactComponent as HomeSvg } from '../../images/home.svg'
// import InfoIcon from '@material-ui/icons/Info'
// auth
import { useAuth } from '../auth'
import { useHistory, NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  navigation: {
    ...theme.displays.hideOnMobile,
    ...theme.displays.flexAlignCenter,
    '& a,button': {
      ...theme.displays.flexAlignCenter,
      marginLeft: theme.spacing(3),
    },
  },

  paper: {
    ...theme.widgets.popover.menu,
    marginTop: theme.spacing(2),
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
  },
  icon: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    color: theme.palette.primary.black,
  },
  user: {
    border: theme.borders[1],
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
}))

function NavHeader() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(false)
  const { signout, user } = useAuth()
  const history = useHistory()

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      const response = await signout()
      if (response.success) {
        console.log('successful logged out')
        history.push('/signin')
      } else alert(response.error.message)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <nav className={classes.navigation}>
        <NavLink to={`/${user?.displayName}`}>
          <HomeSvg className={classes.icon} />
        </NavLink>
        <NavLink to={`/${user?.displayName}/post/create`}>
          <AddSvg className={classes.icon} />
        </NavLink>
        <button
          className={classes.button}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar
            src={avatarImg}
            alt="Romain Moreaux"
            classes={{ root: classes.user }}
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
            <NavLink to={`/${user?.displayName}/account`}>
              <SettingsSvg className={classes.icon} /> Settings
            </NavLink>
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
