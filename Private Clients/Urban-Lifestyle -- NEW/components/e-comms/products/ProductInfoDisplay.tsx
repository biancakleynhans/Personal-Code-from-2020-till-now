import Image from 'next/image';
import React, { useEffect, useState, Fragment } from 'react';
import { PLACEHOLDER, TOTAL_RATING_COUNT } from '../../../constants/AppConstants';
import { iCart, iProduct, iWishList } from '../../../models/Products';
import BreadCrumbs, { iBreadcrumb } from '../../shared/reusable/BreadCrumbs';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import SelectComponent from '../../shared/reusable/SelectComponent';
import { SELECT_STYLE, SUBMIT_BTN } from '../../../constants/Styling';
import { useAuth } from '../../../context/AuthContext';
import { useProductsData } from '../../../context/ProductsContext';
import AlertReuseable from '../../shared/alerts/AlertReuseable';

interface iProps {
  breadCrumbs: iBreadcrumb[];
  product: iProduct;
}

interface iImageProps {
  imageArr: string[];
  cb: (value: number) => void;
  currImage: number;
  name: string;
}

const ImageDisplay = (props: iImageProps) => {
  const { cb, currImage, imageArr, name } = props;
  return (
    <div className='w-full lg:w-[50%] flex flex-col lg:flex-row justify-center lg:ml-24'>
      {imageArr.length <= 1 ? (
        <div className='relative border border-light-300 dark:border-dark-600 shadow-lg shadow-light-400 dark:shadow-dark-400 h-[350px] w-[350px] lg:h-[450px] lg:w-[450px]'>
          <Image src={imageArr[0] ? imageArr[0] : PLACEHOLDER} alt={name} width={512} height={512} layout='fill' />
        </div>
      ) : (
        <>
          <div className='w-[124px] flex flex-row lg:flex-col justify-between mx-4 my-4'>
            {imageArr.map((img, i) => (
              <button
                key={i}
                style={{ backgroundImage: `url(${img})` }}
                className={`designCardMini ${i === currImage ? 'border-2 border-secondary-500 shadow-md shadow-secondary-300 opacity-100' : 'opacity-50'}`}
                onClick={() => cb(i)}
              />
            ))}
          </div>
          <div className='relative border border-light-300 dark:border-dark-600 shadow-lg shadow-light-400 dark:shadow-dark-400 h-[350px] w-[350px]'>
            <Image src={imageArr[currImage]} alt={name} width={512} height={512} layout='fill' />
          </div>
        </>
      )}
    </div>
  );
};

const RatingBar = ({ rating, total = 5 }: { rating: number; total: number }) => {
  let iconsArr: JSX.Element[] = [];

  for (let i = 0; i < total; i++) {
    if (rating === total) {
      iconsArr.push(<BsStarFill size={24} color='gold' className='mx-1' />);
    }

    if (rating < total) {
      if (i <= rating) {
        iconsArr.push(<BsStarFill size={24} color='gold' className='mx-1' />);
      } else {
        iconsArr.push(<BsStar size={24} color='grey' className='mx-1' />);
      }
    }
  }

  if (rating.toString().includes('.5')) {
    let pos = Number(rating.toString().replace('.5', ''));
    // console.log('WE HAVE A HALF', pos);
    iconsArr.splice(pos, 1, <BsStarHalf size={24} color='gold' className='mx-1' />);
  }
  return (
    <div className='flex flex-row justify-between content-center items-center'>
      {iconsArr.map((icon, i) => (
        <Fragment key={i}>{icon}</Fragment>
      ))}
    </div>
  );
};

const PriceDisplay = ({ isOnSale, normalPrice, discount }: { normalPrice: number; discount: number; isOnSale: boolean }) => {
  let totalValue = (normalPrice * (100 - discount)) / 100;
  // console.log('>>>>', totalValue, normalPrice, discount);

  if (isOnSale) {
    return (
      <div className='my-4 flex flex-row justify-between content-center items-center'>
        <div className='px-2 py-1 font-normal text-lg bg-primary-400'>SALE</div>
        <div className='mx-5 font-normal text-lg'>R {totalValue.toFixed(2)}</div>
        <div className='font-bold text-lg line-through decoration-red-600 text-red-500'>R {normalPrice.toFixed(2)} </div>
      </div>
    );
  } else {
    return <div className='my-4 font-normal text-base'>{normalPrice.toFixed(2)}</div>;
  }
};

export default function ProductInfoDisplay(props: iProps) {
  const { breadCrumbs, product } = props;
  const { currUser, addToUserCart, addToUserWishlist } = useAuth();

  const [currImage, setcurrImage] = useState(0);
  const [selectedColor, setselectedColor] = useState('');
  const [selectedSize, setselectedSize] = useState('');
  const [selectedQTY, setselectedQTY] = useState(1);
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setalertText] = useState('');

  useEffect(() => {
    // console.log('%c PRODUCT', 'color:red', product);
  }, [product]);

  useEffect(() => {
    if (selectedQTY < 1) {
      setselectedQTY(1);
    }

    if (selectedQTY > product?.stock) {
      setselectedQTY(product?.stock);
    }
  }, [selectedQTY]);

  useEffect(() => {}, [selectedColor, selectedSize]);

  function OptionsDisplay() {
    let colors = product.color.split(',');
    let sizes = product.size.split(',');

    return (
      <>
        <div className='flex flex-row justify-evenly content-center items-center'>
          <div className='mr-2'>
            {colors.length > 1 ? (
              <SelectComponent
                isMulti={false}
                labelText=''
                placeholder=''
                type='string'
                inputValueString={selectedColor}
                inputValueMulti={[]}
                handleChange={(e) => setselectedColor(e)}
                options={colors.map((x) => ({ disabled: false, label: x.toUpperCase(), value: x }))}
              />
            ) : (
              <div className={SELECT_STYLE}>{product.color}</div>
            )}
          </div>
          <div className='m-2'>
            {sizes.length > 1 ? (
              <SelectComponent
                isMulti={false}
                labelText=''
                placeholder=''
                type='string'
                inputValueString={selectedSize}
                inputValueMulti={[]}
                handleChange={(e) => setselectedSize(e)}
                options={sizes.map((x) => ({ disabled: false, label: x.toUpperCase(), value: x }))}
              />
            ) : (
              <div className={SELECT_STYLE}>{product.size}</div>
            )}
          </div>

          <div className='m-2 hidden lg:flex flex-row justify-evenly content-center items-center'>
            <div className='mr-4'>QUANTITY</div>
            <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center' onClick={() => setselectedQTY(selectedQTY + 1)}>
              +
            </button>
            <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center'>{selectedQTY}</button>
            <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center' onClick={() => setselectedQTY(selectedQTY - 1)}>
              -
            </button>
          </div>
        </div>
        <div className='m-2 flex flex-row justify-evenly content-center items-center lg:hidden'>
          <div className='mr-4'>QUANTITY</div>

          <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center' onClick={() => setselectedQTY(selectedQTY + 1)}>
            +
          </button>

          <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center'>{selectedQTY}</button>

          <button className='border border-dark-400 dark:border-light-300 px-2 py-1 font-bold text-xl text-center' onClick={() => setselectedQTY(selectedQTY - 1)}>
            -
          </button>
        </div>
      </>
    );
  }

  function createCartOrWishlist(type: 'cart' | 'wishlist'): iCart[] | iWishList[] {
    let c: iCart[] | iWishList[] = [];
    if (product && currUser) {
      let totalValue = (product.priceSell * (100 - product.discountPercentage)) / 100;

      let temp: iCart = {
        prodCount: selectedQTY,
        prodId: product.id,
        img: product.images && product.images[0] ? product.images[0] : PLACEHOLDER,
        name: product.name,
        price: product.isOnSale ? totalValue : product.priceSell,
        isSale: product.isOnSale,
        salePrice: product.priceSell,
      };

      // console.log('temp', temp);
      if (type === 'cart') {
        if (currUser.cart && currUser.cart.length > 0) {
          let find = currUser.cart.filter((x) => x.prodId === product.id);
          if (find.length > 0) {
            console.log('this product already exsits lets just update the current exsiting entry ', find[0]);
          } else {
            c = [...currUser.cart];
            c.push(temp);
          }
        } else {
          c.push(temp);
        }
      }

      if (type === 'wishlist') {
        if (currUser.wishlist && currUser.wishlist.length > 0) {
          c = [...currUser.wishlist];
          c.push(temp);
        } else {
          c.push(temp);
        }
      }
    }

    return c;
  }

  function AddToCart() {
    let newCart = createCartOrWishlist('cart');

    // console.log('ADD: ', selectedQTY, ' OF ', product);
    // console.log('CART: ', newCart);

    if (product && currUser && newCart.length > 0) {
      addToUserCart(currUser.uid, newCart)
        .then(() => {
          setalertText('Added item to cart');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR ADDING TO CART', 'color:red', err);
          setalertText('Error in adding product to cart');
          setshowAlert(true);
        });
    }
  }

  function AddToWishList() {
    let newCart = createCartOrWishlist('wishlist');

    // console.log('ADD: ', selectedQTY, ' OF ', product);
    // console.log('WHISLIST: ', newCart);

    if (product && currUser && newCart.length > 0) {
      addToUserWishlist(currUser.uid, newCart)
        .then(() => {
          setalertText('Added item to wishlist');
          setshowAlert(true);
        })
        .catch((err) => {
          console.log('%c ERROR ADDING TO wishlist', 'color:red', err);
          setalertText('Error in adding product to wishlist');
          setshowAlert(true);
        });
    }
  }

  return (
    <div className='flex flex-col justify-start '>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      {showAlert && <AlertReuseable styling={SUBMIT_BTN} alertText={alertText} onHandle={() => setshowAlert(false)} showAlert={showAlert} />}

      {product && (
        <div className='flex flex-col lg:flex-row justify-between mt-5'>
          {/* IMAGE */}
          <ImageDisplay cb={(value) => setcurrImage(value)} currImage={currImage} imageArr={product.images} name={product.name} />

          {/* DETAILS ADD TO CART */}
          <div className='w-full ml-5 lg:ml-32 flex flex-col justify-center items-start'>
            <div className='my-4 font-semibold text-3xl'>{product.name}</div>
            <div className='mb-4 font-normal text-base opacity-75'>{product.brand}</div>
            <RatingBar rating={product.rating} total={TOTAL_RATING_COUNT} />
            <PriceDisplay isOnSale={product.isOnSale} normalPrice={product.priceSell} discount={product.discountPercentage} />
            <OptionsDisplay />
            <div className='my-4 font-normal text-base mr-5'>{product.desc}</div>
            <div className='flex flex-row justify-center content-center items-center'>
              <button className='mr-4 flex flex-row justify-between content-center items-center px-3 py-2 border border-dark-500 dark:border-light-500 shadow shadow-dark-300 dark:shadow-light-300'>
                <FaCartPlus size={24} />
                <div className='mx-2 font-bold text-lg' onClick={() => AddToCart()}>
                  Add to Cart
                </div>
              </button>
              <button className='mx-4 flex flex-row justify-between content-center items-center px-3 py-2 border border-dark-500 dark:border-light-500 shadow shadow-dark-300 dark:shadow-light-300'>
                <FaHeart size={24} />
                <div className='mx-4 font-bold text-lg' onClick={() => AddToWishList()}>
                  Add to wishlist
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
