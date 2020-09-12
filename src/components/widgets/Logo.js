import React from 'react'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  logo: { ...theme.typography.logo },
}))

export function Logo({ css }) {
  const classes = useStyles()
  return (
    <div className={(css && clsx(classes.logo, css)) || classes.logo}>
      InstagramClone
    </div>
  )
}

Logo.propTypes = { css: PropTypes.string }
