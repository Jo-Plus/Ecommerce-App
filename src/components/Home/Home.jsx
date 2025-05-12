import React, { useState, useEffect, useContext } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
  </>
}
