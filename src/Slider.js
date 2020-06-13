import React from 'react';
import { Slide } from 'react-slideshow-image';
import './Slider.css'; 
const properties = {
  duration: 3000,
  transitionDuration: 600,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    //console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
export const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide">
          <div className='i1'>
            
          </div>
        </div>
        <div className="each-slide">
          <div className='i2'>
            
          </div>
        </div>
        <div className="each-slide">
          <div className='i3'>
                    
          </div>
        </div>
        <div className="each-slide">
          <div className='i4'>
            
          </div>
        </div>
      </Slide>
    )
}
export default Slideshow;