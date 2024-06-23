import React from 'react'
import fitness from '../../assets/undraw_fitness_stats_sht6-2.svg'
const Feature2 = () => {
  return (
    <div><div className='w-full bg-slate'>
    <div className='max-w-[1240px] mx-auto flex md:flex-row flex-col hover:scale-105  duration-1000 justify-center items-center  sm:py-4 md:py-10'>
        <div className='flex-1 md:w-[40%] w-full p-4'>
            <p className='text-[#00df9a] text-xl font-bold mb-3'>STATS FOR NERDS</p>
            <h1 className='text-5xl text-white font-bold mb-5'>Get personalised statistics.</h1>
            <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima blanditiis officia facilis. Neque, enim doloribus exercitationem omnis nihil fuga, perspiciatis odit ratione aut hic delectus beatae quisquam libero molestiae nisi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea natus voluptatibus ipsam! Debitis sit iste commodi placeat itaque eos cupiditate vero architecto a, aut id. Vel, odio. Dolorem, vitae voluptatem!</p>
        </div>
        <div className='flex-1 md:w-[60%] w-full '>
            <img className='max-w-[80%]  mx-auto' src={fitness} alt='Fitness' />
        </div>
    </div>
    </div></div>
  )
}

export default Feature2