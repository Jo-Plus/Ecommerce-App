import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import bgPattern from '../../assets/images/light-patten.svg'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {

  }, []);
  return (
    <div className="flex flex-col min-h-screen pt-0 lg:pt-5 bg-pattern-img" style={{ backgroundImage: `url(${bgPattern})` }}>
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto my-6 py-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
