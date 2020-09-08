// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  navigation: {
    '& span': {
      fontWeight: 500,
      marginRight: theme.spacing(1),
    },
  },
  link: {
    textTransform: 'uppercase',
    color: theme.palette.primary.blueDark,
    textDecoration: 'none',
    marginRight: theme.spacing(1),
    fontWeight: 600,
  },
}))

function NavFooter() {
  const classes = useStyles()

  return (
    <nav className={classes.navigation}>
      <span>You want to hire me ?</span>
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
