import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'

const useStyles = makeStyles({
  aside: {
    paddingLeft: '24px',
  },
})

function Aside(props) {
  const position = { props }
  const classes = useStyles(props)

  return (
    <Grid
      container
      item
      className={classes.aside}
      xs={12}
      md={5}
      direction="column"
      alignItems="center"
    >
      <p>Follower 1</p>
      <p>Follower 2</p>
      <p>Follower 3</p>
      <p>Follower 4</p>
      <p>Follower 5</p>
      <p>Follower 6</p>
    </Grid>
  )
}

Aside.propTypes = {
  position: PropTypes.string.isRequired,
}

Aside.defaultProps = {
  position: PropTypes.oneOf(['right', 'left']),
}

export default Aside
