import React, { useState, useEffect } from 'react';
import mainSlider1 from '../../assets/images/slider-image-1.jpeg'
import mainSlider2 from '../../assets/images/slider-image-2.jpeg'
import mainSlider3 from '../../assets/images/slider-image-3.jpeg'
import slide1 from '../../assets/images/fixedImg1.jpeg'
import slide2 from '../../assets/images/fixedImg2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  const [counter, setCounter] = useState(0);
  useEffect(() => {

  }, []);
  return <>
    <div className="row">
      <div className="w-4/4 md:w-3/4">
        <Slider {...settings}>
          <img src={mainSlider1} className='w-full h-[400px] object-cover' alt='Main Slide' />
          <img src={mainSlider2} className='w-full h-[400px] object-cover' alt='Main Slide' />
          <img src={mainSlider3} className='w-full h-[400px] object-cover' alt='Main Slide' />
        </Slider>
      </div>
      <div className="hidden md:block md:w-1/4">
        <img src={slide1} className='w-full h-[200px] object-cover' alt='Secondry Slide 1' />
        <img src={slide2} className='w-full h-[200px] object-cover' alt='Secondry Slide 2' />
      </div>
    </div>
  </>
}
