// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import NavFooter from './navigation/NavFooter'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 0),
    marginTop: 'auto',
  },
  container: {
    ...theme.displays.flexColumn,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  copyright: {
    fontWeight: 600,
    fontSize: 14,
    textTransform: 'uppercase',
    color: theme.palette.primary.grey,
    '& span': {
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.greyDark,
    },
    marginTop: theme.spacing(2),
  },
}))

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <NavFooter />
        <div className={classes.copyright}>
          <p>
            {new Date().getFullYear()} Instagram Clone by
            <span>Romain Moreaux</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
