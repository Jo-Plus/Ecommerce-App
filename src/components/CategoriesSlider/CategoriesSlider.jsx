import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
          breakpoint: 1200,
          settings: {
              slidesToShow: 6,
              slidesToScroll: 5,
          }
      },
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 5,
              slidesToScroll: 4,
          }
      },
      {
          breakpoint: 900,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
          }
      },
    ]
  };

  const [categories, setCategories] = useState([]);
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data}) => {
      setCategories(data.data);
    })
    .catch((error) => {

    })
  }

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getCategories();
  }, []);
  return <>
    <div className='py-5'>
      <h2 className='py-4 text-xl text-gray-800 font-medium'>Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) =>
          <div key={category._id}>
            <img className='category-img w-full object-cover' src={category.image} alt={category.name} />
            <h3 className='font-light mt-2'>{category.name}</h3>
          </div>
        )}
      </Slider>
    </div>
  </>
}
