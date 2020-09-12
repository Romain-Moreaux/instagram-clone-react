// dependances
import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// images
import slide1 from '../../images/1.jpg'
import slide2 from '../../images/2.jpg'
import slide3 from '../../images/3.jpg'
import slide4 from '../../images/4.jpg'

// const slideImages = [
//   'images/slide_2.jpg',
//   'images/slide_3.jpg',
//   'images/slide_4.jpg',
// ]

export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slide1})` }}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slide2}` }}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slide3})` }}>
            <span>Slide 3</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slide4})` }}>
            <span>Slide 4</span>
          </div>
        </div>
      </Slide>
    </div>
  )
}
