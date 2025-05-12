import React, { useState, useEffect } from 'react';

export default function CartItems({count, price, product, updateQuantity, deleteItemFromCart}) {


  return <>
    
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
        <td className="p-4">
          <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">
          {product?.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={() => updateQuantity(product.id , count - 1)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div className="ms-3">
              <span>{count}</span>
            </div>
            <button onClick={() => updateQuantity(product.id , count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">
          {price}EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={() => deleteItemFromCart(product.id)} className="font-medium cursor-pointer text-red-600 hover:underline">Remove</span>
        </td>
      </tr>
  </>
}