import React from 'react';
import { FaMedal, FaGem, FaStar } from 'react-icons/fa';


const Cards = () => {
    return (
        <div className='w-full py-[10rem] px-4 bg-black'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
            {/* Card 1 */}
            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-green-100 to-green-200'>
                <FaMedal className="mx-auto text-5xl mb-4" />
                <h2 className='text-2xl font-bold text-center py-4'>Silver</h2>
                <p className='text-center text-4xl font-bold'>Free</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Track Your Progress</p>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#00df9a] w-[200px] hover:scale-105 duration-1000 mt-4 py-3 font-medium text-black rounded-md'>Subscribe</button>
                </div>
            </div>
    
            {/* Card 2 */}
            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-green-100 to-green-200'>
                <FaGem className="mx-auto text-5xl mb-4" />
                <h2 className='text-2xl font-bold text-center py-4'>Gold</h2>
                <p className='text-center text-4xl font-bold'>₹1000/month</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Access Premium Features</p>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#00df9a] w-[200px] hover:scale-105 duration-1000 mt-4 py-3 font-medium text-black rounded-md'>Subscribe</button>
                </div>
            </div>
    
            {/* Card 3 */}
            <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gradient-to-b from-green-100 to-green-200'>
                <FaStar className="mx-auto text-5xl mb-4" />
                <h2 className='text-2xl font-bold text-center py-4'>Platinum</h2>
                <p className='text-center text-4xl font-bold'>₹2000/month</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Unlock Exclusive Content</p>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#00df9a] w-[200px] hover:scale-105 duration-1000 mt-4 py-3 font-medium text-black rounded-md'>Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    
);
};


export default Cards;
