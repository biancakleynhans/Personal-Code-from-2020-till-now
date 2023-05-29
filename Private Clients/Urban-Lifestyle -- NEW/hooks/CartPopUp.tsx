import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { RiShoppingBasketFill } from 'react-icons/ri';
import Popup from 'reactjs-popup';
import { iCart } from '../models/Products';

interface iProps {
  cart: iCart[];
}

export default function CartPopUpHooked(props: iProps) {
  const { cart } = props;

  const router = useRouter();

  function TriggerBtn() {
    if (cart.length > 0) {
      return (
        <button type='button' className='flex items-center focus:outline-none' aria-label='show cart items'>
          <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
            <div className='cart'>{cart.length}</div>
            <RiShoppingBasketFill size={24} className='text-black dark:text-white' />
          </div>
        </button>
      );
    } else {
      <button type='button' className='flex items-center focus:outline-none' aria-label='show cart items'>
        <div className='px-2'>
          <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
            <RiShoppingBasketFill size={24} className='text-black dark:text-white' />
          </div>
        </div>
      </button>;
    }
  }

  function displayCartContent() {
    if (cart.length > 0) {
      return (
        <div className='flex flex-col justify-start content-center items-center'>
          <div className='flex flex-row flex-wrap justify-between content-center items-center'>
            <div className='text-sm mx-1'>IMAGE</div>
            <div className='text-sm mx-1'>QTY:</div>
            <div className='text-sm mx-1'>NAME:</div>
            <div className='text-sm mx-1'>PRICE</div>
          </div>
          {cart.map((x) => (
            <button className='w-full flex flex-row flex-wrap justify-between content-center items-center border' onClick={() => router.push('/user')}>
              <Image src={x.img} alt='broken' width={50} height={50} />
              <div className='text-base mx-2'>{x.prodCount}</div>
              <div className='text-base mx-2'>{x.name}</div>
              <div className='text-base mx-2'>{x.price}</div>
            </button>
          ))}
        </div>
      );
    } else {
      return <div>No items in cart yet</div>;
    }
  }

  return (
    <Popup trigger={TriggerBtn()} position='bottom center' offsetX={16} closeOnDocumentClick={true}>
      {displayCartContent()}
    </Popup>
  );
}
