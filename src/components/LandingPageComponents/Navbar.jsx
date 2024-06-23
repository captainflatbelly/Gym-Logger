import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
const Navbar = () => {
  const [nav,setNav ] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <div className=' flex justify-between items-center h-20 mx-auto px-4 max-w-[1240px] text-white'>
        <h1 className='w-full text-3xl font-bold text-[#00df98] m-4'>POTENTIA.</h1>
        <ul className='hidden md:flex'>
          <li className='p-4'>
            Home
            </li>
          <li className='p-4'>About</li>
          <li className='p-4'>Services</li>
          <li className='p-4'>Contact</li>
        </ul>
        <div onClick = {handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
         <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in duration-500' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-out duration-1000'}>
          <h1 className='w-full text-3xl font-bold px-4 py-4 text-[#00df98] m-4'>POTENTIA.</h1>
          <ul className='pt-12 uppercase p-4'>
            <li className='p-4 border-b border-gray-600'>Home</li>
            <li className='p-4 border-b border-gray-600'>About</li>
            <li className='p-4 border-b border-gray-600'>Services</li>
            <li className='p-4'>Contact</li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar