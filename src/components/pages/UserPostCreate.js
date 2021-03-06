// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import NavBottom from '../navigation/NavMobile'
import Header from '../Header'
// custom hooks
import { PostCreate } from '../post'
import { Title } from '../widgets'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 0, 7),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
}))

export default function UserPostCreate() {
  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <Title component="h1">Write a new post</Title>
          <PostCreate />
        </div>
      </div>
      <NavBottom />
    </>
  )
}
