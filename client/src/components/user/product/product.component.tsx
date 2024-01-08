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
    // <div className='flex flex-col product--container w-[285px]'>
    <div className='col-span-6 md:col-span-4 lg:col-span-3'>
      {/* <ImageRoller images={product.images} /> */}
      <div className='w-full max-h-[300px] overflow-hidden'>
        <img
          src={`http://localhost:8080/${product?.images[0]?.imagePath}` || ''}
          alt={product?.images[0]?.alt || 'Image not available'}
          className="image-thumbnail min-h-full w-auto h-auto"
        />
      </div>
      <div className="product--details w-full bg-light-bg overflow-hidden">
        <Link href={`/shop/${product._id}`}>
          <h4 className="product--heading font-semibold leading-[120%] font-poppins text-2xl m-4 text-gray-1">
            {product.name}
          </h4>
        </Link>
        <div className='font-medium font-poppins text-gray-3 text-base m-4'>{product.tagline}</div>
        <div className="flex m-4 flex-row justify-between">
          <span className="product--sale-price text-gray-1 font-poppins text-xl font-semibold leading-7">
            Rs. {product.salePrice}
          </span>
          <span className="product--sale-price text-gray-4 font-poppins text-base font-normal line-through">
            Rs. {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
