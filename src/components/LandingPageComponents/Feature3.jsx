import React from 'react'
import fitness1 from '../../assets/undraw_indoor_bike_pwa4.svg'
import fitness2 from '../../assets/undraw_personal_training_0dqn.svg'
const Feature3 = () => {
  return (
    <div className='w-full bg-white'>
        <div className='max-w-[1240px] mx-auto flex md:flex-row flex-col hover:scale-105  duration-1000 justify-center items-center md:py-10 sm:py-4'>
        <div className='flex-1 md:w-[30%] w-full '>
                <img className='max-w-[80%]  mx-auto' src={fitness1} alt='Fitness' />
            </div>
            <div className='flex-1 md:w-[40%] w-full p-4'>
                <p className='text-[#00df9a] text-xl font-bold mb-3'>FAR FROM YOUR GYMBRO?</p>
                <h1 className='text-5xl text-black font-bold mb-5'>Virtual Live Workouts.</h1>
                <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima blanditiis officia facilis. Neque, enim doloribus exercitationem omnis nihil fuga, perspiciatis odit ratione aut hic delectus beatae quisquam libero molestiae nisi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea natus voluptatibus ipsam! Debitis sit iste commodi placeat itaque eos cupiditate vero architecto a, aut id. Vel, odio. Dolorem, vitae voluptatem!</p>
            </div>
            <div className='flex-1 md:w-[30%] w-full '>
                <img className='max-w-[80%]  mx-auto' src={fitness2} alt='Fitness' />
            </div>
        </div>
    </div>
 
  )
}

export default Feature3