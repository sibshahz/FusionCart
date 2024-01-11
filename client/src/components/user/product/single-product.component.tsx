'use client'
import React from 'react';
import { Product } from '@/product/product.types';
import LayoutContainer from '../layout-container/layout-container.component';
import { useAppDispatch } from '@/src/redux/client-hooks';
import { addToCart } from '@/src/redux/features/client/cart/cartSlice';

type Props = {
  product: Product;
};

const SingleProduct: React.FC<Props> = ({ product }) => {
  const dispatch=useAppDispatch();
  const [selectedImg,setSelectedImg]=React.useState(0)
  
  const setIndex = React.useCallback((index) => {
    setSelectedImg(index);
  }, []);

  const handleAddToCart=()=>{
    //dispatch action to add the selected item into cart
    dispatch(addToCart(
      {
        product:{...product},
        quantity:1,
        subTotal:1000,
        addedOn:new Date(),
      }
    ))
  }

  return (
    <>
    <LayoutContainer bg='inherit'>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
      <div className="">
        <div className='product--image-gallery flex flex-row gap-7'>
          <div className='product--image-roller'>
          <div className='rounded-lg flex flex-col gap-8 overflow-hidden'>
            {product?.images?.map((img, index) => (
              index !== selectedImg ? (
                <div 
                  onClick={() => setIndex(index)}
                  key={index} 
                  className='rounded-lg overflow-hidden flex-shrink-0 w-20 h-20 hover:cursor-pointer'>
                  <img 
                    src={`http://localhost:8080/${img?.imagePath}` || 'Image alt'}
                    alt={img?.imageAlt}
                    className='w-full h-full object-cover'
                  />
                </div>
              ) : (
                null
              )
            ))}
          </div>

          </div>
          <div className='product--image-selected overflow-hidden max-h-[470px] rounded-lg'>
            <img 
            className='w-full h-full object-cover'
            src={`http://localhost:8080/${product?.images[selectedImg]?.imagePath}` || ''} alt={product?.images?.[selectedImg]?.imageAlt} />
          </div>
        </div>
      </div>

      <div className="">
        <div className='flex flex-col gap-4'>

          <div className='product--title text-[42px] font-normal leading-normal'>{product?.name}</div>
          <div className='product--price text-xl font-medium text-gray-3'>{product?.tagline}</div>
          <div className='product--price text-2xl font-medium text-gray-5'>Rs. {product?.salePrice} .00</div>
          <div className='product--actions flex flex-row gap-5'>

          <button className="bg-white text-xl font-normal py-4 px-12 rounded-2xl border border-black" onClick={() => handleAddToCart()}>
            + Add to cart
          </button>
              
          <button className="bg-white text-xl font-normal py-4 px-12 rounded-2xl border border-black">
            Buy now
          </button>

          </div>
        </div>
      </div>
    </div>
    </LayoutContainer>

    <div>
      <LayoutContainer bg='inherit'>
        <div className='text-justify text-base font-normal text-gray-5 leading-normal'>
          {product?.description}
        </div>
      </LayoutContainer>
    </div>
    </>
  );
};

export default SingleProduct;
