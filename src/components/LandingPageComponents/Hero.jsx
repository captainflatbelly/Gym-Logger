import React from 'react';
import { ReactTyped } from 'react-typed';
import { NavLink } from 'react-router-dom';
import {toast} from 'sonner';
const Hero = () => {
  return (
    <div className='text-white pb-10' >
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center'>
        <p className='text-[#00df9a] font-bold p-2'>REAL TIME WORKOUT TRACKER</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Keep Up.</h1>
        <div>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold'>effortless, hassle-free tracking of</p>
          <ReactTyped
            className='md:text-4xl sm:text-3xl text-xl font-bold text-gray-500'
            strings={['Goals', 'Sets', 'Reps']}
            typeSpeed={100}
            backSpeed={110}
            loop
          />
        </div>
        <NavLink to='/signup'>
          <button className='bg-[#00df9a] w-[200px] hover:scale-105 duration-1000 mt-4 py-3 font-medium my-6 text-black rounded-md'>Get Started</button>
        </NavLink>
        <NavLink to='/login'>
          <button className='bg-[#00df9a] w-[200px] hover:scale-105 duration-1000 mt-4 py-3 font-medium my-6 text-black rounded-md'>Login</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
