"use client"
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import React from 'react'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProductsList
} from '@/src/api/products/products'
import HeroSection from '@/src/components/user/hero-section/hero-section.component'
import FeaturedRanges from '@/src/components/user/featured-ranges/featured-range.component'

const Home = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery('products', getProductsList)
  return (
    <>
      <HeroSection />
      <FeaturedRanges />
    </>
  )
}

export default Home