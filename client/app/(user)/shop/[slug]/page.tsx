"use client"
import React from 'react'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProduct
} from '@/src/api/products/products'
type Props = {}

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const queryClient = useQueryClient()
  // Queries
  const { data, error, isLoading, refetch } = useQuery('product', () => getProduct(params.slug));
  
  return (
    <div>Product page</div>
  )
}

export default ProductPage