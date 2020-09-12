import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  submit: { ...theme.widgets.buttons.primary },
  disabled: {
    backgroundColor: theme.palette.primary.greyLight,
    color: `${theme.palette.primary.greyDark} !important`,
  },
}))

export function Submit({ handleDisabled, callback, css, label }) {
  const classes = useStyles()
  return (
    <Button
      className={css}
      classes={{ disabled: classes.disabled, root: classes.submit }}
      onClick={callback}
      disabled={handleDisabled}
    >
      {label}
    </Button>
  )
}

Submit.propTypes = {
  label: PropTypes.string,
  callback: PropTypes.func,
  handleDisabled: PropTypes.bool,
}

Submit.defaultProps = {
  label: 'submit',
  callback: () => {},
  handleDisabled: false,
}
