import React from 'react'
import { makeStyles } from '@material-ui/core'

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
    ...theme.typography.logo,
  },
}))

export function Logo() {
  const classes = useStyles()
  return <div className={classes.logo}>InstagramClone</div>
}
