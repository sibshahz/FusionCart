import LayoutContainer from '@/src/components/user/layout-container/laytout-container.component'
import React from 'react'
import Cover from '../../public/imgs/main-cover.jpg'
import Image from 'next/image'

const Home = () => {
  return (
    <LayoutContainer>
      <h1>Furnior Products</h1>
      <Image src={Cover.src} alt="Main cover" width={500} height={500} />
    </LayoutContainer>
  )
}

export default Home