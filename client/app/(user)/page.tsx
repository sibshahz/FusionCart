"use client"
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import React from 'react'
import Cover from '../../public/imgs/main-cover.jpg'
import Image from 'next/image'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProducts
} from '@/src/api/products/products'

const Home = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery('products', getProducts)
  return (
    <LayoutContainer>
      <h1>Furnior Products</h1>
      <Image src={Cover.src} alt="Main cover" width={500} height={500} />
    </LayoutContainer>
  )
}

export default Home