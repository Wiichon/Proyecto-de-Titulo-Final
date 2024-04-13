import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/PDI.webp';

function HomePage() {
  return (
    <div className="bg-cover h-screen relative flex justify-center items-center">
      <img src={backgroundImage} alt="Background" className="w-full max-h-full max-w-full object-cover" />
      
    </div>

  )
}

export default HomePage