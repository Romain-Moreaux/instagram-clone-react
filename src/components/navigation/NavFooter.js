// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  navigation: {
    ...theme.displays.flexAlignCenter,
    '& p': { fontWeight: 500, fontSize: 18 },
  },
  link: {
    textTransform: 'uppercase',
    color: theme.palette.primary.blueDark,
    textDecoration: 'none',
    margin: theme.spacing(0, 1),
    fontWeight: 600,
  },
}))

function NavFooter() {
  const classes = useStyles()

  return (
    <nav className={classes.navigation}>
      <p>You want to hire me ?</p>
      <a
        className={classes.link}
        href="https://www.linkedin.com/in/romainmoreaux/"
      >
        linkedin
      </a>
      <a className={classes.link} href="https://github.com/Romain-Moreaux">
        Github
      </a>
    </nav>
  )
}

export default NavFooter
