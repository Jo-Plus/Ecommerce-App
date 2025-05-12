import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';

let router = createBrowserRouter([
  {path: '', element: <Layout/>, children: [
    {index: true, element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path: 'categories', element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path: 'checkout/:cartId', element: <ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path: 'allorders', element: <ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path: 'login', element: <Login/>},
    {path: 'register', element: <Register/>},
    {path: '*', element: <Notfound/>},
  ]}
])

const myClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnMount: true,
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //     retry: 6,
  //     refetchInterval: 1000,
  //     refetchIntervalInBackground: true,
  //     gcTime: 1000,
  //   }
  // }
});

function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </CounterContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <Toaster toastOptions={{
        // success: {
        //   style: {backgroundColor: "green", color: "white"},
        //   position: "top-right",
        // },
        // error: {

        // }
      }} />
      {/* <ReactQueryDevtools/> */}
    </QueryClientProvider>
  );
}

export default App
