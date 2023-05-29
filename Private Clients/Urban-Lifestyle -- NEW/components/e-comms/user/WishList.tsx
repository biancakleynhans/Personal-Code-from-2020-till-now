import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { iCart } from '../../../models/Products';
import CardContainer from '../../shared/reusable/CardContainer';
import { MdDelete } from 'react-icons/md';
import { RiShoppingBasketFill } from 'react-icons/ri';
import { addToUserCart, addToUserWishlist } from '../../../firebase/functions/UserShop';
import AlertReuseable from '../../shared/alerts/AlertReuseable';
import { SUBMIT_BTN } from '../../../constants/Styling';
import ConfirmPopUpAlert from '../../shared/alerts/ConfirmPopUpAlert';

export default function WishList() {
  const { currUser } = useAuth();

  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setalertText] = useState('');

  const [showAlertDelete, setshowAlertDelete] = useState(false);
  const [showAlertWishlist, setshowAlertWishlist] = useState(false);
  const [deleteIndex, setdeleteIndex] = useState(-1);

  useEffect(() => {
    console.log('WISHLIST', currUser?.wishlist);
  }, [currUser?.wishlist]);

  useEffect(() => {}, [showAlert, alertText]);

  function handleRemoveFromWishList() {
    setshowAlertDelete(false);
    setalertText('');
    let remove = currUser?.wishlist[deleteIndex];

    if (deleteIndex !== -1 && remove !== undefined && currUser && currUser.wishlist) {
      // console.log('remove from wishlist Confirmed ', deleteIndex, remove);
      let clone = currUser.wishlist;

      clone.splice(deleteIndex, 1);

      // console.log('CLONE??', clone);

      addToUserWishlist(currUser.uid, clone)
        .then(() => {
          setalertText('Removed product from your wishlist ');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR REMOVING FROM wishlist', 'color:red', err);
          setalertText('Error in removing  product from your wishlist');
          setshowAlert(true);
        });
    }

    // reset Delete index
    setdeleteIndex(-1);
  }

  function handleMoveToCart() {
    setshowAlertWishlist(false);
    setalertText('');

    let remove = currUser?.wishlist[deleteIndex];

    if (deleteIndex !== -1 && remove !== undefined && currUser && currUser.cart && currUser.wishlist) {
      console.log('remove and move to wishlist', currUser.wishlist, currUser.cart, deleteIndex);

      let clone = currUser.wishlist;
      let hasItem = currUser.cart.filter((x) => x.prodId === remove?.prodId);

      // already exsits
      if (hasItem.length > 0) {
      }
      // not in wishlist yet so just do a normal add
      else {
        let cloneW = currUser.cart;
        cloneW.push(remove);
        clone.splice(deleteIndex, 1);
        console.log('CLONE??', clone, cloneW, hasItem);

        addToUserWishlist(currUser.uid, clone)
          .then(() => {
            setalertText('Removed product from your cart ');
            setshowAlert(true);
            addToUserCart(currUser.uid, cloneW)
              .then(() => {
                setalertText('Added product to your cart ');
                setshowAlert(true);
              })
              .catch((err) => {
                console.log('%c ERROR Adding product to your cart', 'color:red', err);
                setalertText('Error in adding  product from your cart');
                setshowAlert(true);
              });
          })
          .catch((err) => {
            console.log('%c ERROR REMOVING FROM WISHLIST', 'color:red', err);
            setalertText('Error in removing  product from your wishlist');
            setshowAlert(true);
          });
      }
    }

    // reset Delete index
    setdeleteIndex(-1);
  }

  function DisplayEntry(entry: iCart, prodIndex: number) {
    return (
      <div className='w-full flex flex-row justify-between content-center items-center border-2 rounded border-primary-500 p-2 my-2'>
        <div className='w-[50px] lg:w-[100px]'>
          <Image src={entry.img} alt={entry.name} width={64} height={64} />
        </div>

        <div className='text-lg font-normal text-left w-[50px] lg:w-[200px]'>{entry.name}</div>

        <div className='w-[50px] lg:w-[200px] flex flex-row justify-start content-center items-center'>
          <button className='w-[35px] h-[35px] border-primary-500 mx-[2px] border rounded'>{entry.prodCount}</button>
        </div>

        <div className='text-lg font-bold text-left w-[50px] lg:w-[200px]'>R {(entry.isSale ? entry.salePrice : entry.price).toFixed(2)}</div>

        <div className='w-[50px] lg:w-[200px] flex flex-row justify-center content-center items-center'>
          <button
            onClick={() => {
              setalertText('Are you sure you want to move this item to your cart ? ');
              setshowAlertWishlist(true);
              setdeleteIndex(prodIndex);
            }}
          >
            <RiShoppingBasketFill size={24} className='text-sky-600 mx-10' />
          </button>
          <button
            onClick={() => {
              setalertText('Are you sure you want to remove this item ?? this cannot be undone?? ');
              setshowAlertDelete(true);
              setdeleteIndex(prodIndex);
            }}
          >
            <MdDelete size={24} className='text-error-600 ' />
          </button>
        </div>
      </div>
    );
  }

  function DisplayWishList() {
    return (
      <div>
        <div className='w-full flex flex-col'>
          {/* HEARDER LINE */}
          <div className='w-full flex flex-row justify-between content-center items-center p-2 my-2'>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[100px] text-transparent'>Image</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Name</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Quantity</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Price</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px] text-transparent'>Edit</div>
          </div>

          {/* Content in cart */}
          {currUser?.wishlist.map((c, i) => (
            <Fragment key={i}>{DisplayEntry(c, i)}</Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <AlertReuseable styling={SUBMIT_BTN} alertText={alertText} onHandle={() => setshowAlert(false)} showAlert={showAlert} />

      <ConfirmPopUpAlert
        styling={SUBMIT_BTN}
        alertText={alertText}
        onHandleCancel={() => setshowAlertDelete(false)}
        onHandleConfirm={() => handleRemoveFromWishList()}
        showAlert={showAlertDelete}
      />

      <ConfirmPopUpAlert
        styling={SUBMIT_BTN}
        alertText={alertText}
        onHandleCancel={() => setshowAlertWishlist(false)}
        onHandleConfirm={() => handleMoveToCart()}
        showAlert={showAlertWishlist}
      />
      {currUser && currUser.wishlist ? (
        <div className='w-full flex flex-col lg:flex-row justify-around content-start items-start'>
          <CardContainer width='w-[95%] lg:w-[60%] mx-2' title='Wishlist' subtitle isDark={false}>
            {DisplayWishList()}
          </CardContainer>
        </div>
      ) : (
        <>Loading ....</>
      )}
    </>
  );
}
