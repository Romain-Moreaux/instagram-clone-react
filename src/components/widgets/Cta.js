// dependances
import React, { useState } from 'react'
import { Menu, Fade, MenuItem, makeStyles } from '@material-ui/core'
// images
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles((theme) => ({
  cta: {
    marginLeft: 'auto',
    '& button': {
      backgroundColor: 'transparent',
      border: theme.borders[1],
      fontWeight: 600,
      borderRadius: 30,
      padding: theme.spacing(0, 2),
      height: 24,
    },
  },
  menu: {
    ...theme.widgets.popover.menu,
    marginTop: theme.spacing(2),
  },
  icon: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    color: theme.palette.primary.black,
  },
}))

export function Cta() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(false)
  return (
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
        classes={{ paper: classes.menu }}
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
            <GitHubIcon classes={{ root: classes.icon }} /> for a project
          </a>
        </MenuItem>
        <MenuItem key={1}>
          <a href="https://www.linkedin.com/in/romainmoreaux/">
            <LinkedInIcon classes={{ root: classes.icon }} /> for a job
          </a>
        </MenuItem>
        <MenuItem key={2}>
          <a href="mailto:romoreaux@gmail.com">
            <EmailIcon classes={{ root: classes.icon }} /> Any question ?
          </a>
        </MenuItem>
      </Menu>
    </div>
  )
}
