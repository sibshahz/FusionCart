import React from 'react'
import { Product } from '@/src/types/product/product.types'
import Image from 'next/image'
import Link from 'next/link'


const ProductComponent = (product: Product) => {
  return (
    <div className='flex flex-col product--container'>
      <Image 
        src={`/imgs/products/${product.images?.[0]}`} 
        alt={`some alt}`} 
        width={285} height={300} 
      />
      <div className="product--details">
        <Link href={`/shop/${product._id}`}>
          <h4 className="product--heading">
            {product.name}
          </h4>
        </Link>
        <span>{product.tagline}</span>
        <div className="flex">
          <span className="product--sale-price">
            {product.salePrice}
          </span>
          <span className="product--sale-price strike-l">
            {product.price}
          </span>
        </div>
        
      </div>
      
    </div>
  )
}

export default ProductComponent