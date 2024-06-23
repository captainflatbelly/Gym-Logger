import React from 'react'
import fitness from '../../assets/undraw_fitness_tracker_3033-2.svg'
const Analytics = () => {
  return (
    <div className='w-full bg-white '>
    <div className='max-w-[1240px] hover:scale-105 duration-1000 mx-auto flex md:flex-row flex-col justify-center items-center sm:py-4 md:py-10'>
        <div className='flex-1 md:w-[60%] w-full '>
            <img className='max-w-[80%]  mx-auto' src={fitness} alt='Fitness' />
        </div>
        <div className='flex-1 md:w-[40%] w-full p-4'>
            <p className='text-[#00df9a] text-xl font-bold mb-3'>BECAUSE EVERY CALORIE COUNTS</p>
            <h1 className='text-5xl font-bold mb-5'>Track all your workouts.</h1>
            <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima blanditiis officia facilis. Neque, enim doloribus exercitationem omnis nihil fuga, perspiciatis odit ratione aut hic delectus beatae quisquam libero molestiae nisi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea natus voluptatibus ipsam! Debitis sit iste commodi placeat itaque eos cupiditate vero architecto a, aut id. Vel, odio. Dolorem, vitae voluptatem!</p>
        </div>
    </div>
    </div>

  )
}

export default Analytics