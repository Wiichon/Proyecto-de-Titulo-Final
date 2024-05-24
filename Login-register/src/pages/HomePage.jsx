import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/PDI_Chile_2008.webp';

function HomePage() {
  return (
    <div className="bg-cover h-screen relative flex justify-center items-center">
      <div className="flex items-center justify-center h-screen">
        <img src={backgroundImage} alt="" />
      </div>

    </div>

  )
}

export default HomePage