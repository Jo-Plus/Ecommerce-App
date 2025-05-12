import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let navigate = useNavigate();
  let {setUserLogin} = useContext(UserContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(formValues) {
    setIsLoading(true);


    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
    .then((apiResponse) => {
      if(apiResponse?.data?.message === 'success') {
        localStorage.setItem('userToken', apiResponse.data.token);
        setUserLogin(apiResponse.data.token);
        setIsLoading(false);
        navigate('/');
      }
    })
    .catch((apiResponse) => {
      setIsLoading(false);
      setApiError(apiResponse?.response?.data?.message);
    });
  }


  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name min length is 3').max(10, 'Name max length is 10').required('Name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be valid egyptian number').required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with uppercase then three or more of lowercase characters').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password and repassword must be same').required('repassword is required'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister 
  });

  return <>
    <div className="p-6 max-w-xl mx-auto">
      {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {apiError}
      </div> : null}
      <h2 className="text-3xl font-normal mb-6 text-main">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name: </label>
        </div>
        {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.name}
        </div> : null}
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address: </label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.email}
        </div> : null}
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone number: </label>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.phone}
        </div> : null}
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password: </label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.password}
        </div> : null}
        <div className="relative z-0 w-full mb-5 group">
          <input id="floating_rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="floating_rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword: </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {formik.errors.rePassword}
        </div> : null}
        <div className='flex items-center flex-wrap'>
          <button type="submit" className="m-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
          </button>
          <p className='m-3 pl-4'>you have account? <span className='font-semibold'><Link to={'/login'}>Login Now</Link></span></p>
        </div>
        
      </form>
    </div>
  </>
}
