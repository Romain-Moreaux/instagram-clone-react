// dependances
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
// images
import InstaLogo from '../images/logo_insta.png'
// components
import { AddPost } from './Modals'
import NavHeader from './navigation/NavHeader'

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0),
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
    margin: 'auto',
    '@media (min-width: 760px)': { margin: 0 },
  },

  image: {
    objectFit: 'contain',
    objectPosition: 'left',
    height: 29,
  },
}))

function Header() {
  const classes = useStyles()
  const [openAddPost, setOpenAddPost] = useState(false)

  return (
    <>
      <AddPost setOpen={setOpenAddPost} open={openAddPost} />
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src={InstaLogo} alt="" className={classes.image} />
          </div>
          <NavHeader />
        </div>
      </header>
    </>
  )
}

export default Header
