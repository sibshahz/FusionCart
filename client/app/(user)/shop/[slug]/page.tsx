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
import ProductComponent from '@/src/components/user/product/product.component'
import SingleProduct from '@/src/components/user/product/single-product.component'
type Props = {}

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const queryClient = useQueryClient()
  // Queries
  const { data, error, isLoading, refetch } = useQuery('product', () => getProduct(params.slug));
  
  return (
    <div>

        <SingleProduct product={data} />
        {/* <div className='w-[400px]'>
       { data?.images?.map((link: Image, index: number) => (
        <div key={index} className='w-full'>
          <img
            width={200}
            height={200}
            id={link?._id}
            src={`http://localhost:8080/${link.imagePath}`}
            alt={link.alt || 'Image not available'}
            className="image-thumbnail min-w-full"
          />
        </div>
      ))}
        </div>
        <div>{
          data?.name
        }</div>
        <div>{
          data?.tagline
        }</div>
        <div>{
          data?.description
        }</div>
        <div>{
          data?.price
        }</div>
        <div>{
          data?.salePrice
        }</div> */}
    </div>
  )
}

export default ProductPage;