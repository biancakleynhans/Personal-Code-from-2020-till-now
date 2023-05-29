import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PLACEHOLDER } from '../../../constants/AppConstants';
import { iProduct } from '../../../models/Products';

interface iProps {
  product: iProduct;
}

//ROUTE FOR PRODUCT IS === /shop/Bongs/Glass/test12?pid=12365478&isProduct=true

export default function ProductCardDisplay(props: iProps) {
  const { product } = props;
  const router = useRouter();
  let use = product.images !== undefined && product.images !== undefined ? product.images[0] : PLACEHOLDER;

  return (
    <button
      onClick={() => {
        // console.log('Go to product page', `/shop/${product.category}/${product.subcategory}/${product.name}?pid=${product.id}&isProduct=true`);
        router.push(`/shop/${product.category}/${product.subcategory}/${product.name}?pid=${product.id}&isProduct=true`);
      }}
      className='flex flex-col justify-center content-center items-center border-1 border-primary-500 shadow-md shadow-primary-400'
    >
      <div style={{ backgroundImage: `url(${use})` }} className='designCard' />
      <div className='flex flex-col justify-center content-center items-center p-2'>
        <div className='text-lg font-semibold'>{product.name}</div>
        <div className='text-base font-normal text-center'>{product.brand}</div>
        <div className='text-xl font-normal'>R {product.priceSell}</div>
      </div>
    </button>
  );
}
