import Image from 'next/image';
import React, { useEffect, useState, Fragment } from 'react';
import { DELIVERY_COST, VALID_COUPONS } from '../../../constants/AppConstants';
import { useAuth } from '../../../context/AuthContext';
import { iCart } from '../../../models/Products';
import CardContainer from '../../shared/reusable/CardContainer';
import InputComponent from '../../shared/reusable/InputComponent';
import { MdDone, MdAdd, MdDelete } from 'react-icons/md';
import { RiHeartAddFill } from 'react-icons/ri';
import { addToUserCart, addToUserWishlist } from '../../../firebase/functions/UserShop';
import AlertReuseable from '../../shared/alerts/AlertReuseable';
import { SUBMIT_BTN } from '../../../constants/Styling';
import ConfirmPopUpAlert from '../../shared/alerts/ConfirmPopUpAlert';

export default function Cart() {
  const { currUser } = useAuth();

  const [subtotal, setsubtotal] = useState<number>(0.0);
  const [total, settotal] = useState<number>(0.0);
  const [discount, setdiscount] = useState<number>(0.0);
  const [deliveryCost, setdeliveryCost] = useState<number>(DELIVERY_COST);
  const [itemCount, setitemCount] = useState(0);

  const [coupon, setcoupon] = useState<string>('');
  const [isValid, setisValid] = useState(false);
  const [checkingOut, setcheckingOut] = useState<boolean>(false);

  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setalertText] = useState('');

  const [showAlertDelete, setshowAlertDelete] = useState(false);
  const [showAlertWishlist, setshowAlertWishlist] = useState(false);
  const [deleteIndex, setdeleteIndex] = useState(-1);

  useEffect(() => {
    if (currUser && currUser.cart) {
      console.log('CART', currUser.cart);

      if (currUser.cart.length === 0) {
        setdeliveryCost(0.0);
      }

      let temp = 0.0;
      let disc = 0.0;
      let ct = 0;

      currUser.cart.forEach((c) => {
        if (c.isSale) {
          let use = c.salePrice - c.price;
          let t = c.salePrice * c.prodCount;
          disc = disc + use * c.prodCount;
          temp = temp + t;
          // console.log('>>>>', c.salePrice, c.price, use, c.prodCount, use, c.prodCount);
        } else {
          let t = c.price * c.prodCount;
          temp = temp + t;
          // console.log('??', c.price, c.prodCount, c.isSale, c.salePrice);
        }

        ct = ct + c.prodCount;
      });

      setitemCount(ct);
      setdiscount(disc);
      setsubtotal(temp);
      settotal(temp - disc + deliveryCost);
    }
  }, [currUser?.cart, currUser?.cart.filter((x) => x.prodCount)]);

  useEffect(() => {}, [total, discount, subtotal, isValid, deliveryCost, showAlert, alertText, itemCount, coupon]);

  function handleCoupon() {
    if (!isValid) {
      let isValid = VALID_COUPONS.filter((x) => coupon === x.name);
      if (isValid.length > 0) {
        // console.log("let's see if you are valid", coupon.toUpperCase(), isValid[0]);
        let use = isValid[0];
        getDiscountValue(use.discType, use.amount);
      }
    }
  }

  function getDiscountValue(type: string, amount: number) {
    console.log('????', type, amount);
    if (type === 'ZAR') {
      setdiscount(discount + amount);
      settotal(total - amount);
      setisValid(true);
    } else if (type === '%') {
      let newVal = 0;
      newVal = (total * (100 - amount)) / 100;
      settotal(newVal);
      setisValid(true);
    } else if (type === 'free delivery') {
      setdeliveryCost(deliveryCost - amount);
      setisValid(true);
    } else {
      setisValid(false);
    }
  }

  function removeMoreProduct(prodId: string) {
    console.log('remove one');
    let clone = currUser?.cart ? currUser.cart : [];

    clone.map((x) => {
      if (x.prodId === prodId) {
        console.log('found one that needs update', x.prodCount);
        x.prodCount = x.prodCount - 1 > 0 ? x.prodCount - 1 : 0;
        return x;
      } else {
        return x;
      }
    });

    if (currUser) {
      addToUserCart(currUser.uid, clone)
        .then(() => {
          setalertText('Removed  one more ');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR Removing more TO CART', 'color:red', err);
          setalertText('Error in Removing a product from your cart');
          setshowAlert(true);
        });
    }
  }

  function addMoreProduct(prodId: string) {
    console.log('add one', prodId);

    let clone = currUser?.cart ? currUser.cart : [];

    clone.map((x) => {
      if (x.prodId === prodId) {
        console.log('found one that needs update', x.prodCount);
        x.prodCount = x.prodCount + 1;
        return x;
      } else {
        return x;
      }
    });

    if (currUser) {
      addToUserCart(currUser.uid, clone)
        .then(() => {
          setalertText('Added one more ');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR ADDING more TO CART', 'color:red', err);
          setalertText('Error in adding a product to your cart');
          setshowAlert(true);
        });
    }
  }

  function handleRemoveFromCart() {
    setshowAlertDelete(false);
    setalertText('');
    let remove = currUser?.cart[deleteIndex];

    if (deleteIndex !== -1 && remove !== undefined && currUser && currUser.cart) {
      // console.log('remove from cart Confirmed ', deleteIndex, remove);
      let clone = currUser.cart;

      clone.splice(deleteIndex, 1);

      // console.log('CLONE??', clone);

      addToUserCart(currUser.uid, clone)
        .then(() => {
          setalertText('Removed product from your cart ');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR REMOVING FROM CART', 'color:red', err);
          setalertText('Error in removing  product from your cart');
          setshowAlert(true);
        });
    }

    // reset Delete index
    setdeleteIndex(-1);
  }

  function handleMoveToWish() {
    setshowAlertWishlist(false);
    setalertText('');

    let remove = currUser?.cart[deleteIndex];

    if (deleteIndex !== -1 && remove !== undefined && currUser && currUser.cart && currUser.wishlist) {
      console.log('remove and move to wishlist', currUser.wishlist, currUser.cart, deleteIndex);

      let clone = currUser.cart;
      let hasItem = currUser.wishlist.filter((x) => x.prodId === remove?.prodId);

      // already exsits
      if (hasItem.length > 0) {
      }
      // not in wishlist yet so just do a normal add
      else {
        let cloneW = currUser.wishlist;
        cloneW.push(remove);
        clone.splice(deleteIndex, 1);
        console.log('CLONE??', clone, cloneW, hasItem);

        addToUserCart(currUser.uid, clone)
          .then(() => {
            setalertText('Removed product from your cart ');
            setshowAlert(true);
            addToUserWishlist(currUser.uid, cloneW)
              .then(() => {
                setalertText('Added product to your wishlist ');
                setshowAlert(true);
              })
              .catch((err) => {
                console.log('%c ERROR Adding product to your wishlist', 'color:red', err);
                setalertText('Error in adding  product from your wishlist');
                setshowAlert(true);
              });
          })
          .catch((err) => {
            console.log('%c ERROR REMOVING FROM CART', 'color:red', err);
            setalertText('Error in removing  product from your cart');
            setshowAlert(true);
          });
      }
    }

    // reset Delete index
    setdeleteIndex(-1);
  }

  // ToDo:
  function handlecheckout() {
    console.log('handle checkout create eft refrence for eft payment and pop upload ');
    // setcheckingOut(true)
  }

  // DISPLAYS
  function DisplayEntry(entry: iCart, prodIndex: number) {
    return (
      <div className='w-full flex flex-row justify-between content-center items-center border-2 rounded border-primary-500 p-2 my-2'>
        <div className='w-[50px] lg:w-[100px]'>
          <Image src={entry.img} alt={entry.name} width={64} height={64} />
        </div>

        <div className='text-lg font-normal text-left w-[50px] lg:w-[200px]'>{entry.name}</div>

        <div className='w-[50px] lg:w-[200px] flex flex-row justify-start content-center items-center'>
          <button className='w-[35px] h-[35px] border-primary-500 mx-[2px] border rounded-full' onClick={() => removeMoreProduct(entry.prodId)}>
            -
          </button>
          <button className='w-[35px] h-[35px] border-primary-500 mx-[2px] border rounded'>{entry.prodCount}</button>
          <button className='w-[35px] h-[35px] border-primary-500 mx-[2px] border rounded-full' onClick={() => addMoreProduct(entry.prodId)}>
            +
          </button>
        </div>

        <div className='text-lg font-bold text-left w-[50px] lg:w-[200px]'>R {(entry.prodCount * (entry.isSale ? entry.salePrice : entry.price)).toFixed(2)}</div>

        <div className='w-[50px] lg:w-[200px] flex flex-row justify-center content-center items-center'>
          <button
            onClick={() => {
              setalertText('Are you sure you want to move this item to your wishlist? ');
              setshowAlertWishlist(true);
              setdeleteIndex(prodIndex);
            }}
          >
            <RiHeartAddFill size={24} className='text-sky-600 mx-10' />
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

  function DisplayCart() {
    return (
      <div>
        <div className='w-full flex flex-col'>
          {/* HEARDER LINE */}
          <div className='w-full flex flex-row justify-between content-center items-center p-2 my-2'>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[100px] text-transparent'>Image</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Name</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Quantity</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px]'>Subtotal</div>
            <div className='text-xl font-semibold text-left w-[50px] lg:w-[200px] text-transparent'>Edit</div>
          </div>

          {/* Content in cart */}
          {currUser?.cart && currUser?.cart.length > 0 && currUser?.cart.map((c, i) => <Fragment key={i}>{DisplayEntry(c, i)}</Fragment>)}
          {currUser?.cart && currUser?.cart.length === 0 && (
            <div className='flex flex-row justify-center content-center items-center text-2xl font-medium'>No products in cart yet, please keep browsing and shopping</div>
          )}
        </div>
      </div>
    );
  }

  function DisplayTillSlip() {
    return (
      <>
        {currUser && currUser.cart && currUser?.cart.length > 0 && (
          <div className='w-[95%] lg:w-[30%] mt-5 p-4 flex flex-col justify-center content-start items-center border'>
            <div className='w-full p-2 text-xl font-bold text-left'>Your Order</div>
            <div className='w-full flex flex-row justify-between content-start items-center '>
              <div className='text-lg font-normal text-left ml-3 '>{itemCount} Items</div>
              <div className='text-lg font-normal text-right mr-3'>R {subtotal.toFixed(2)}</div>
            </div>

            <div className='w-full flex flex-row justify-between content-start items-center '>
              <div className='text-lg font-normal text-left ml-3 '>Delivery</div>
              <div className='text-lg font-normal text-right mr-3'>R {deliveryCost.toFixed(2)}</div>
            </div>

            <div className='w-full flex flex-row justify-between content-start items-center '>
              <div className='text-lg font-normal text-left ml-3 '>Discount</div>
              <div className='text-lg font-normal text-right mr-3'>- R {discount.toFixed(2)}</div>
            </div>

            <div className='my-4' />

            <div className='w-full flex flex-row justify-between content-start items-center '>
              <div className='text-xl font-bold text-left ml-3 '>Total</div>
              <div className={`text-xl font-bold text-right mr-3 ${isValid && 'text-green-800 dark:text-green-400 '}`}>R {total.toFixed(2)}</div>
            </div>

            <div className='my-2' />

            {/* coupon removed for now needs more stable logic  */}
            {/* <div className='w-full flex flex-row justify-between content-start items-center '>
              <InputComponent
                handleChange={(e) => {
                  if (!isValid) {
                    setcoupon(e.toUpperCase());
                  }
                }}
                inputValue={coupon}
                labelText=''
                placeholder='ENTER COUPON CODE'
                type='text'
              />
              <button className='p-5' onClick={() => handleCoupon()}>
                {isValid ? <MdDone size={36} className='text-green-800 dark:text-green-400 ' /> : <MdAdd size={36} className='text-white ' />}
              </button>
            </div> */}

            <div className='my-2' />

            <button className='py-2 w-full mx-10 bg-error-600 text-white text-xl font-bold leading-relaxed rounded-xl border-2  border-white' onClick={() => handlecheckout()}>
              Proceed to check out
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <AlertReuseable styling={SUBMIT_BTN} alertText={alertText} onHandle={() => setshowAlert(false)} showAlert={showAlert} />

      <ConfirmPopUpAlert
        styling={SUBMIT_BTN}
        alertText={alertText}
        onHandleCancel={() => setshowAlertDelete(false)}
        onHandleConfirm={() => handleRemoveFromCart()}
        showAlert={showAlertDelete}
      />

      <ConfirmPopUpAlert
        styling={SUBMIT_BTN}
        alertText={alertText}
        onHandleCancel={() => setshowAlertWishlist(false)}
        onHandleConfirm={() => handleMoveToWish()}
        showAlert={showAlertWishlist}
      />

      {currUser && currUser.cart ? (
        <div className='w-full flex flex-col lg:flex-row justify-around content-center items-center'>
          {!checkingOut && (
            <CardContainer width='w-[95%] lg:w-[60%] mx-2' title='Cart' subtitle isDark={true}>
              {DisplayCart()}
            </CardContainer>
          )}

          {DisplayTillSlip()}
        </div>
      ) : (
        <>Loading ....</>
      )}

      {/* CHECK OUT SECTION  */}
      {checkingOut && <div>{/* <Checkout cart={currUser.cart} client={currUser} goBack={() => setcheckingOut(false)} /> */}</div>}
    </>
  );
}
