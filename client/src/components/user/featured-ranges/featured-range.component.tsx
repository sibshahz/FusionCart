import React from 'react'
import bedroom from '@/public/imgs/ranges/bedroom.png';
import dining from '@/public/imgs/ranges/dining.png';
import living from '@/public/imgs/ranges/living.png';
import Image from 'next/image';

type Props = {}

const ranges = [
  {
    id: 1,
    name: 'Dining',
    image: dining
  },
  {
    id: 2,
    name: 'Living',
    image: living
  },
  {
    id: 3,
    name: 'Bedroom',
    image: bedroom
  }
]

const FeaturedRanges = (props: Props) => {
  return (
    <section className='py-10 md:py-14'>
      <div className="content text-center mb-8 md:mb-14">
      <h2 className='text-gray-1 font-bold text-3xl capitalize'>Browse the range</h2>
      <p className='text-xl font-normal text-font-color-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="flex flex-row justify-center items-center gap-5 flex-wrap">
        {
          ranges.map(range => {
            return (
              <div key={range.id} className="flex w-auto h-auto flex-col items-center justify-center gap-6 mb-8 max-w-md overflow-hidden">
                <div className="overflow-hidden w-[380px] h-[480px] relative rounded-xl">
                  <Image
                  src={range.image.src}
                  alt={range.name}
                  className='relative object-cover object-center '
                  fill
                    />
                </div>
                <div className="card-content relative">
                  <h3 className="text-2xl font-semibold text-gray-1 capitalize">{range.name}</h3>
                </div>
              </div>
            )
          })
        }

      </div>
      
    </section>
  )
}

export default FeaturedRanges