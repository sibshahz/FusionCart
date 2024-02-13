"use client"
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import React from 'react'

import {
  getProductsList
} from '@/src/api/products/products'
import HeroSection from '@/src/components/user/hero-section/hero-section.component'
import FeaturedRanges from '@/src/components/user/featured-ranges/featured-range.component'
import FeaturedProducts from '@/src/components/user/featured-products/featured-products.components'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedRanges />
      <FeaturedProducts />
    </>
  )
}

export default Home