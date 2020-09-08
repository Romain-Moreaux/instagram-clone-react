// dependances
import React, { useState } from 'react'
import { makeStyles, MenuItem, Fade, Menu } from '@material-ui/core'
// images
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import EmailIcon from '@material-ui/icons/Email'
// components
import { AddPost } from './Modals'
import NavHeader from './navigation/NavHeader'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0),
    borderBottom: theme.borders[0],
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.spacing(7),
    zIndex: theme.zIndex.appBar,
    '& a,button': { cursor: 'pointer' },
  },
  container: {
    ...theme.displays.flexAlignCenter,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  logo: {
    display: 'flex',
    // margin: 'auto',
    // '@media (min-width: 760px)': { margin: 0 },
    ...theme.typography.logo,
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
    height: 29,
  },
  cta: {
    marginLeft: 'auto',
    '& button': {
      backgroundColor: 'transparent',
      border: theme.borders[1],
      fontWeight: 600,
      borderRadius: 30,
      padding: theme.spacing(1, 2),
    },
  },
  paper: {
    ...theme.widgets.popover.menu,
    marginTop: theme.spacing(2),
  },
}))

function Header() {
  const classes = useStyles()
  const [openAddPost, setOpenAddPost] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)

  return (
    <>
      <AddPost setOpen={setOpenAddPost} open={openAddPost} />
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>InstagramClone</div>
          <div className={classes.cta}>
            <button
              className={classes.button}
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Hire me :)
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
                <a href="https://github.com/Romain-Moreaux">
                  <GitHubIcon /> for a project
                </a>
              </MenuItem>
              <MenuItem key={1}>
                <a href="https://www.linkedin.com/in/romainmoreaux/">
                  <LinkedInIcon /> for a job
                </a>
              </MenuItem>
              <MenuItem key={2}>
                <a href="mailto:romoreaux@gmail.com">
                  <EmailIcon /> Any question ?
                </a>
              </MenuItem>
            </Menu>
          </div>
          <NavHeader />
        </div>
      </header>
    </>
  )
}

export default Header
