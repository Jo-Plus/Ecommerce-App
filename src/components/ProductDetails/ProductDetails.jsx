import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Loader from '../Loading/Loader';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let {id, category} = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [relatedProducts, setRelatedProducts] = useState([]);

  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data}) => {
      let allProducts = data.data;
      let related = allProducts.filter((product) => product.category.name == category);
      setRelatedProducts(related);
    })
    .catch(() => {

    })
  }

  const {data: productDetails, isLoading, isFetching, error, isError} = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  })

  const {addItemToCart, setCartItems} = useContext(CartContext);

  async function addItem(id) {
    const response = await addItemToCart(id);
    if(response.data.status == "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success('Product has been added successfully!');
    }
  }

  useEffect(() => {
    getRelatedProducts(category);
  }, [id, category]);
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : (
        <>

<div className="row flex sm:flex-col lg:flex-row ">
  <div className="w-full lg:w-1/4 p-6">
    <Slider {...settings}>
      {productDetails?.images.map((src, index) => (
        <img key={index} className='w-full' src={src} alt={productDetails?.title} />
      ))}
    </Slider>
  </div>

  <div className="w-full lg:w-3/4 p-6 lg:p-12">
    <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
    <p className='text-gray-600 mt-4 font-light'>{productDetails?.description}</p>
    <div className='flex my-4 justify-between items-center'>
      <span>{productDetails?.price} EGP</span>
      <span>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
    </div>
    <button onClick={() => addItem(productDetails.id)} className='btn'>add to cart</button>
  </div>
</div>

<div className="w-full mt-6">
  <Slider 
    {...{
      ...settings,
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }}
  >
    {relatedProducts.map((product) => (
      <div key={product.id} className="p-2">
        <div className="product py-4 px-2">
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <img className='w-full' src={product.imageCover} alt={product.title} />
            <span className='block font-normal mt-2 text-main'>{product.category.name}</span>
            <h3 className='text-lg font-normal text-gray-800 mb-4'>
              {product.title.split(' ').slice(0, 2).join(' ')}
            </h3>
            <div className='flex justify-between items-center'>
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
            </div>
          </Link>
          <button onClick={() => addItem(product.id)} className='btn'>add to cart</button>
        </div>
      </div>
    ))}
  </Slider>
</div>

        </>
      )}
    </>
  );
}
