import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    flexBasis: '100%',
    ...theme.widgets.title,
  },
}))

export function Title({ component: Component, children }) {
  const classes = useStyles()

  return <Component className={classes.pageTitle}>{children}</Component>
}
