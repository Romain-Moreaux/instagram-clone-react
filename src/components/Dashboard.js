// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Header from './Header'
import PostList from './PostList'
import Aside from './Aside'

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.black,
    minHeight: '100vh',
    overflowX: 'hidden',
    ...theme.displays.flexColumn,
    ...theme.typography.body1,
  },
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
    </>
  )
}

export default Dashboard
