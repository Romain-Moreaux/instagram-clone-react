import React from 'react'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'

const useStyles = makeStyles({
  aside: ({ position }) =>
    position === 'right'
      ? {
          marginLeft: '20px',
        }
      : { marginRight: '20px' },
})

function Aside(props) {
  const position = { props }
  const classes = useStyles(props)

  return (
    <div className={classes.aside}>
      <InstagramEmbed
        url="https://instagr.am/p/Zw9o4/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  )
}

Aside.propTypes = {
  position: PropTypes.string.isRequired,
}

Aside.defaultProps = {
  position: PropTypes.oneOf(['right', 'left']),
}

export default Aside
