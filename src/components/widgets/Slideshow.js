// dependances
import React from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { makeStyles } from '@material-ui/core'
// images
import smartphonesImg from '../../images/bg-mockup-smartphones.png'
import slide1 from '../../images/1.jpg'
import slide2 from '../../images/2.jpg'
import slide3 from '../../images/3.jpg'
import slide4 from '../../images/4.jpg'

const slideImages = [slide1, slide2, slide3, slide4]

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    display: 'flex',
    position: 'relative',
  },
  smartphonesImg: {
    maxHeight: 500,
    marginLeft: '-30px',
  },
  slideContainer: {
    position: 'absolute',
    width: 200,
    top: 75,
    left: 90,
  },
  eachFade: {
    display: 'flex',
    width: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

const properties = {
  arrows: false,
  autoplay: true,
  pauseOnHover: false,
  duration: 3000,
}

export const Slideshow = () => {
  const classes = useStyles()
  return (
    <div className={classes.sliderBox}>
      <img className={classes.smartphonesImg} src={smartphonesImg} alt="" />
      <div className={classes.slideContainer}>
        <Fade {...properties}>
          {slideImages.map((each, index) => (
            <div className={classes.eachFade} key={index}>
              <img src={each} alt="" />
            </div>
          ))}
        </Fade>
      </div>
    </div>
  )
}
