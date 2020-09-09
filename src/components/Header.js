// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import NavHeader from './navigation/NavHeader'
import { Cta, Logo } from './widgets'

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
}))

function Header() {
  const classes = useStyles()

  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <Logo />
          <Cta />
          <NavHeader />
        </div>
      </header>
    </>
  )
}

export default Header
