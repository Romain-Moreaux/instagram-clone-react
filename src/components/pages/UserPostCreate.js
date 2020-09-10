// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import NavBottom from '../navigation/NavMobile'
import Header from '../Header'
// custom hooks
import { PostCreate } from '../post'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 0, 7),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  pageTitle: {
    flexBasis: '100%',
    ...theme.widgets.title,
  },
}))

export default function UserPostCreate() {
  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <h1 className={classes.pageTitle}>Write a new post</h1>
          <PostCreate />
        </div>
      </div>
      <NavBottom />
    </>
  )
}
