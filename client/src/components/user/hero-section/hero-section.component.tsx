import React from 'react'
import Image from 'next/image'
import HeroImage from '@/public/imgs/main-cover.jpg';
type Props = {}

const HeroSection = (props: Props) => {
  return (
    <section >
      <div className={`hero-container w-full h-screen max-h-[85vh] relative overflow-hidden flex flex-row items-center justify-end`}>
        <Image
          className={`background-fixed bg-scroll`}
          src={HeroImage.src}
          alt="Furniro Furnitures"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        <div className={`hero-message bg-baby-pink absolute bg-opacity-80 md:right-[4%] pt-16 px-6 md:px-10 pb-9 max-w-2xl rounded-none md:rounded-lg`}>
          <span className='tagline capitalize text-gray-1 font-semibold text-sm md:text-base tracking-[3px] mb-1'>New Arrival</span>
          <h1 className='capitalize font-bold text-golden text-3xl md:text-5xl mb-4'>Discover our new collection</h1>
          <p className='font-medium text-base md:text-lg text-gray-1 mb-6 md:mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <button className='uppercase bg-golden text-white font-bold text-sm md:text-base px-16 py-6 hover:brightness-95'>Buy now</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection