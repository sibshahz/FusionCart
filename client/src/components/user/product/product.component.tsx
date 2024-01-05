import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../../../common/product/product.types';

interface ImageRollerProps {
  images: Image[];
}

const ImageRoller = ({ images }: ImageRollerProps) => {
  return (
    <div>
      {images?.map((link: Image, index: number) => (
        <div key={index}>
          <img
            width={200}
            height={200}
            id={link?._id}
            src={`http://localhost:8080/${link.imagePath}`}
            alt={link.alt || 'Image not available'}
            className="image-thumbnail"
          />
        </div>
      ))}
    </div>
  );
};

const ProductComponent = (product: Product) => {
  return (
    <div className='flex flex-col product--container'>
      <ImageRoller images={product.images} />
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
  );
};

export default ProductComponent;
