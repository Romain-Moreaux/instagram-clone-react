// dependances
import React from 'react'
import { makeStyles } from '@material-ui/core'
// components
import Header from '../Header'
import { PostList } from '../post'
import Aside from '../Aside'
import NavBottom from '../navigation/NavMobile'
import Footer from '../Footer'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(5, 0, 7),
  },
  container: {
    ...theme.displays.flexWrap,
    ...theme.wrappers.w975,
    ...theme.spaces.horizontal.md,
  },
  section: {
    flex: 1,
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  listPosts: {
    ...theme.displays.flexWrap,
    [theme.breakpoints.up('sm')]: {
      flex: 1,
    },
  },
}))

function Dashboard() {
  const classes = useStyles()
  return (
    <>
      <Header />
      <div className={classes.main}>
        <div className={classes.container}>
          <PostList css={classes.listPosts} />
          <div className={classes.section}>
            <Aside />
            <Footer />
          </div>
        </div>
      </div>
      <NavBottom />
    </>
  )
}

export default Dashboard
