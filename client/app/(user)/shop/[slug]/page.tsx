"use client"
import React from 'react'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProduct
} from '@/src/api/products/products'
import { Product } from '@/product/product.types'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
type Props = {}

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const queryClient = useQueryClient()
  // Queries
  const { data, error, isLoading, refetch } = useQuery('product', () => getProduct(params.slug));
  
  return (
    <div>
      <LayoutContainer bg='inherit'>
        {
          data?.name
        }
      </LayoutContainer>
    </div>
  )
}

export default ProductPage