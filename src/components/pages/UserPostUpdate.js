// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import NavBottom from '../navigation/NavMobile'
import Header from '../Header'
// custom hooks
import { PostUpdate } from '../post'
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

export default function UserPostUpdate() {
  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <Title component="h1">Update my post</Title>
          <PostUpdate />
        </div>
      </div>
      <NavBottom />
    </>
  )
}
