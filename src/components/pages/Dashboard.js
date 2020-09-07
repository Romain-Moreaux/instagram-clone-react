// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Header from '../Header'
import { PostList } from '../post'
import Aside from '../Aside'
import NavBottom from '../navigation/NavMobile'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 'auto'),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
}))

function Dashboard() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <PostList />
          <Aside />
        </div>
      </div>
      <NavBottom />
    </>
  )
}

export default Dashboard
