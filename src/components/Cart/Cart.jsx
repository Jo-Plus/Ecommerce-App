import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FaTrash } from "react-icons/fa";
import CartItems from '../CartItems/CartItems';
import emptyCart from '../../assets/images/Empty-cart.svg'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../Loading/Loader';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  const {getUserCart, updateItemCount, deleteItem, removeCart, setCartItems} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function getLoggedUserCart() {
    setIsLoading(true);
    const response = await getUserCart();
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data);
    }
    setIsLoading(false);
  }

  async function updateQuantity(id, count) {
    const response = await updateItemCount(id, count);
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data);
      toast.success('Item quantity has been updated');
    }
  }

  async function deleteItemFromCart(id) {
    const response = await deleteItem(id);
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data);
      setCartItems(response?.data?.numOfCartItems);
      toast.success('Item has been deleted');
    }
  }

  async function clearCart() {
    let res = await removeCart();
    if (res?.data?.message === 'success') {
        setCartDetails(null);
        setCartItems(0);
        toast.success('Cart cleared successfully');
    }
    else {
      toast.error("Failed to clear the cart");
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if(isLoading) {
    return <Loader />
  }
  return <>
    { cartDetails !== null && cartDetails?.products?.length > 0 ?
    <div className="relative overflow-x-auto sm:rounded-lg p-6 ">
      <h2 className='text-main my-3 text-3xl font-normal'>Cart Details</h2>
      <div className="flex justify-between items-center mb-3">
        <p className='h3 text-green-500 text-xl font-bold'>Total Price {cartDetails?.totalCartPrice}</p>
        <button onClick={clearCart} className='bg-red-600 hover:bg-red-700 rounded-sm py-2 px-2 text-white cursor-pointer flex items-center gap-2'>Clear Cart <FaTrash className='inline-block' /></button>
      </div>
      <table className="w-full text-sm text-left shadow-md rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            cartDetails?.products.map(p => <CartItems key={p.product.id} updateQuantity={updateQuantity} deleteItemFromCart={deleteItemFromCart} count={p.count} price={p.price} product={p.product} />)
          }
        </tbody>
      </table>
      <Link to={`/checkout/${cartDetails?._id}`} className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center inline-block mt-4">
        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : <span className='text-white text-lg font-medium'>Checkout</span>}
      </Link>
    </div> : <>
    <div className="flex justify-center my-5">
      <img className="h-64 md:h-96 lg:h-[500px] w-auto" src={emptyCart} alt="Empty Cart" />
    </div>
    </> }
  </>
}
