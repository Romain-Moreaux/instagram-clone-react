// dependances
import React, { useState } from 'react'
import {
  Avatar,
  makeStyles,
  MenuItem,
  Menu,
  Fade,
  Link,
} from '@material-ui/core'
// images
import avatarImg from '../images/avatar1.jpg'
import InstaLogo from '../images/logo_insta.png'
import { ReactComponent as AddSvg } from '../images/add.svg'
import { ReactComponent as SettingsSvg } from '../images/settings.svg'
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
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  logo: {
    display: 'flex',
  },
  navigation: {
    display: 'flex',
    marginLeft: 'auto',
  },

  paper: {
    ...theme.widgets.popover.menu,
    marginTop: theme.spacing(2),
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
    height: 29,
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    marginLeft: theme.spacing(2),
    '&:first-of-type': {
      marginLeft: 0,
    },
  },
}))

function Header() {
  const classes = useStyles()
  const [openAddPost, setOpenAddPost] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
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
                    <Link
                      href={'/account/edit'}
                      onClick={() => console.log('clicked')}
                    >
                      <SettingsSvg /> Settings
                    </Link>
                  </MenuItem>
                  <MenuItem key={1} onClick={signout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
