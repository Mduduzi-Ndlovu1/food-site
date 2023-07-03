import React from 'react';
import Delivery from '../img/img/delivery.png'
import HeroBg from '../img/img/heroBg.png'
import { heroData } from '../utils/data';
import Header from './Header';





const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id='home'>
      <div  className=' gap-6 p-4 flex-1 flex flex-col items-start  justify-center'>
        <div className='flex item-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
          <p className='text-base text-orange-500 font-semibold'> Delivery</p>
          <div className='w-6 h-6 rounded-full overflow-hidden drop-shadow-xl'>
            <img src={Delivery} alt="Delivery" className='w-full h-full object-contain bg-white' />
          </div>
        </div>

        <p className='text-[2.5rem] font-bold tracking-wide text-headingColor md:text-[4.5rem'>
          Best food in  <span className='text-orange-600 text-[3rem] md:text-[5rem]'>Dawn Park</span> 
          </p>

          <p className='text-base text-textColor text-center md:text-left'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum odio quas rerum, iste, voluptatibus similique inventore nesciunt ad voluptas quibusdam, facilis perferendis laboriosam qui excepturi id beatae voluptate debitis totam?</p>

          <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 flex'>Order Now</button>
      </div>
      <div className='py-2 flex-1 flex items-center relative '>
          <img src={HeroBg} alt="Hero Banner" className='ml-auto h-400 w-full lg:w-auto lg:h-650'/>

{/* food card */}
          <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center py-4  gap-4 flex-wrap drop-shadow-lg lg:px-20 '>
           {heroData && heroData.map((n) => (
             <div key={n.id} className=' lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl  flex flex-col items-center justify-center'>
             <img src={n.immgSrc} alt="I1" className='w-20 lg:w-40 lg:-mt-20  -mt-10 '/>

             <p className='text-base lg:text-xl mt-2 lg:mt-4 font-semibold text-textColor' >{n.name}</p>

             <p className='text-[10px] lg:text-sm lg:my-3 text-lighttextGray font-semibold my-1'>{n.desc}</p>

             <p className='text-m font-semibold text-headingColor'><span className='text-xs text-red-600'>R</span> {n.price} </p>
           </div>
           ))}

          </div>
        
      </div>
    </section>

  )
}

export default HomeContainer