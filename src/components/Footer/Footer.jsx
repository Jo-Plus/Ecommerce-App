import React from 'react';
import amazonPay from '../../assets/images/Amazon_Pay_logo.png';
import masterCard from '../../assets/images/MasterCard-Logo.png';
import payPal from '../../assets/images/PayPal.png';
import googlePlay from '../../assets/images/get-it-on-google-play-badge.png';
import appleStore from '../../assets/images/get-it-on-apple-store.png';

export default function Footer() {
  return (
    <div className='w-full bg-gray-100 py-10'>
      <div className='container mx-auto px-8 lg:px-16'>
        <footer className='grid gap-8'>
          <div>
            <h5 className='text-3xl font-light mb-2'>Get the FreshCart app</h5>
            <h6 className='text-gray-600'>
              We will send you a link, open it on your phone to download the app
            </h6>
          </div>
          <div className='flex flex-col md:flex-row gap-6 items-center'>
            <input
              className='w-full md:w-10/12 p-3 border border-gray-300 rounded-lg bg-white'
              type='text'
              placeholder='Email ..'
            />
            <button className='w-full md:w-2/12 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg cursor-pointer'>
              Share App Link
            </button>
          </div>
          <div className='border-t border-gray-300 my-6'></div>
          <div className='flex flex-col md:flex-row items-center gap-6 text-center md:text-left'>
            <div className='flex flex-wrap justify-center md:justify-start items-center gap-4'>
              <span className='text-lg font-light'>Payment Partners</span>
              <img className='h-5' src={amazonPay} alt='Amazon Pay' />
              <img className='h-8' src={masterCard} alt='MasterCard' />
              <img className='h-5' src={payPal} alt='PayPal' />
            </div>
            <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
              <span className='text-gray-600 mr-2'>Get deliveries with FreshCart</span>
              <img className='h-10' src={googlePlay} alt='Google Play' />
              <img className='h-10' src={appleStore} alt='Apple Store' />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}