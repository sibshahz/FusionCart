import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../../../common/product/product.types';

interface ImageRollerProps {
  images: Image[];
}

const ImageRoller = ({ images }: ImageRollerProps) => {
  return (
    <div className='w-full'>
      {images?.map((link: Image, index: number) => (
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
  );
};

const ProductComponent = (product: Product) => {
  return (
    <div className='flex flex-col product--container w-[285px]'>
      {/* <ImageRoller images={product.images} /> */}
      <div className='w-full h-[300px] overflow-hidden'>
        
        <img
          src={`http://localhost:8080/${product?.images[0]?.imagePath}` || ''}
          alt={product?.images[0]?.alt || 'Image not available'}
          className="image-thumbnail min-h-full w-auto h-auto"
        />
      </div>
      <div className="product--details w-full">
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
  );
};

export default ProductComponent;
