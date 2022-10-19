import styles from '../styles/FibreCategoryCard.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import ProductHeroBanner from './ProductHeroBanner';
import { useRouter } from 'next/router';

export const PriceDisplay = ({ price }: { price: string }) => {
  return (
    <section className={`outline-none mt-1`}>
      <span className='text-2xl laptop:text-3xl font-bold text-mwgray-d'>{isNaN(Number(price)) ? price : `R${price}pm`}</span>
    </section>
  );
};

export const PreProductPriceDisplay = ({ price, preProduct }: { price: number; preProduct: any }) => {
  if (preProduct !== null) {
    // console.log('Normal price', price, 'preproduct price', preProduct.preProductRate, 'Discounted product price', preProduct.preProductDiscountedProductRate);

    let isSame = price === Number(preProduct.preProductRate.toFixed(2)) ? true : false;
    let check = isSame ? preProduct.preProductDiscountedProductRate.toFixed(2) : preProduct.preProductRate.toFixed(2);

    //   console.log('isSame', isSame, check);
    return (
      <div className='flex flex-col'>
        <div className='text-xl laptop:text-2xl font-semibold text-mwgray-l line-through decoration-mwred decoration-2 '>{`R${price}pm`}</div>
        <div className='text-2xl laptop:text-3xl font-bold text-mwgray-d'>{`R${check}pm`}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

interface iProps {
  provider: any;
  product: any;
  typeDisplay: string;
  hasCoverageSearchResults: boolean;
  providersStats: any[];
  page: string;
  productButtonText: string;
  overRideForProductClicked: () => void;
  useOverRideFunc: boolean;
}

// Styling cleaned up
const outerContainer = 'product-card w-full flex flex-col justify-between min-h-[186px] border border-mwgray mwCardShadow p-4 hover:mwCardHoverShadow ';
const outerStyle = `w-36 transition-all duration-500 bg-gradient-to-r from-mwred to-mwred-l text-white transition duration-1000 hover:bg-mwred-l`;
const innerStyle = 'transition duration-1000 hover:bg-mwred-l';
const addedStyle = 'shadow-lg';
const padding = 'py-2 px-4';

const AB_outer = `hidden laptop:flex flex-col justify-end ${styles.cardMinWidth} w-full tablet:w-6/12 p-4 animate-productCardEntry`;
const normalOuter = 'hidden laptop:flex flex-col justify-end w-full tablet:w-6/12 p-4 animate-productCardEntry';

export default function FibreCategoryCard(props: iProps) {
  const { hasCoverageSearchResults, product, provider, typeDisplay, page, providersStats, productButtonText, overRideForProductClicked, useOverRideFunc } = props;
  const router = useRouter();
  const NormalOuter = `${page === 'mop-step2' ? styles.cardMinWidthMOP : styles.cardMinWidth}`;

  let status = providersStats.filter((p) => p?.code === provider?.coverageCode)[0]?.status;
  const callToActionText = productButtonText.length > 0 ? productButtonText : status !== 'live' ? 'pre-order' : 'View more';

  const [isAB, setisAB] = useState<boolean>(false);

  useEffect(() => {
    let check = router.pathname.includes('internet');
    setisAB(check);
  }, [router]);

  useEffect(() => {}, [isAB]);

  useEffect(() => {
    // console.log('Card', status, product?.providerCode, provider?.coverageCode);
  }, [hasCoverageSearchResults, product, provider, productButtonText, typeDisplay, useOverRideFunc]);

  function handleCardClick() {
    // console.log('We have clicked on a product card lets see what needs to happen ', useOverRideFunc);
    if (useOverRideFunc) {
      // console.log('handle override here');
      router.push(product.newUrl.replace('fibre', 'switch'));
      overRideForProductClicked();
    } else {
      router.push(product.newUrl);
    }
  }

  const MobileView = () => {
    return (
      <div className=' w-full flex flex-col justify-end cursor-pointer tablet:px-4 py-4 laptop:hidden animate-productCardEntry' onClick={() => handleCardClick()}>
        <div className='w-full'>
          <ProductHeroBanner hasCoverageSearched={hasCoverageSearchResults} isHero={product.isHero} heroOption={product.heroOption} heroTagline={product.heroTagline} />
        </div>
        <div className={`${outerContainer} ${product.hasPreProduct ? 'max-h-[250px]' : 'max-h-[186px]'} `}>
          {/* INFO */}
          <div className='w-full flex justify-between mb-2'>
            <section className='w-full'>
              {/* NAME */}
              <div className='flex justify-start'>
                <h1 className='text-mwgray-xd text-lg font-bold'>
                  {/* AB TEST CHECK NAME */}
                  {isAB && !hasCoverageSearchResults ? <a href={product.newUrl}>{product.productDisplayName}</a> : product.productDisplayName}
                </h1>
              </div>

              {/* THROTTLE & PRICES */}
              <div className='flex w-full justify-between'>
                <div className='flex flex-col'>
                  <p className='text-mwgray'>{product.throttleStatus}</p>
                  {!product.hasPreProduct && <PriceDisplay price={product.productDisplayPrice} />}
                  {product.hasPreProduct && <PreProductPriceDisplay price={product.productDisplayPrice} preProduct={product.preProduct} />}
                </div>

                {/* UPLOAD AND DOWNLOAD SPEED */}
                <div className='w-44 tablet:w-40 flex justify-end items-end space-x-4'>
                  <section className='py-2 flex flex-col items-center'>
                    <FontAwesomeIcon icon={faArrowDown} className='h-4 mb-1 text-mwgray' />
                    <div className='text-mwgray-l text-sm font-bold'>Download</div>
                    <p className='text-mwgray text-md'>{product.downloadSpeedMbps}</p>
                  </section>
                  <div className='laptop:hidden w-[1px] h-full bg-mwgray-el'></div>
                  <section className='py-2 flex flex-col items-center'>
                    <FontAwesomeIcon icon={faArrowUp} className='h-4 mb-1 text-mwgray' />
                    <div className='text-mwgray-l text-sm font-bold'>Upload</div>
                    <p className='text-mwgray text-md'>{product.uploadSpeedMbps}</p>
                  </section>
                </div>
              </div>
            </section>
          </div>
          {/* IMAGE AND BTN */}
          <div className='flex justify-between items-center space-x-2'>
            <section className='outline-none relative w-28 h-12'>
              <Image src={provider.logoUrl} alt='logo' objectFit='contain' layout='fill' className='p-4' />
            </section>

            <section className='outline-none'>
              <button className={`${outerStyle} product-card text-sm focus:outline-none ${addedStyle}`} onClick={() => handleCardClick()}>
                <div className={`block hover:no-underline ${innerStyle} ${padding}`}>{callToActionText}</div>
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className={isAB ? AB_outer : `${NormalOuter} ${normalOuter} cursor-pointer`} onClick={() => handleCardClick()}>
        {/* banner */}
        <div className='w-full'>
          <ProductHeroBanner hasCoverageSearched={hasCoverageSearchResults} isHero={product.isHero} heroOption={product.heroOption} heroTagline={product.heroTagline} />
        </div>

        {/* NAME Desc throttle up/down speeds  */}
        <div className={outerContainer}>
          <div className='flex justify-between mb-7'>
            <section>
              <h1 className='text-mwgray-xd text-lg text-left font-bold z-50'>
                {isAB && !hasCoverageSearchResults ? <a href={product.newUrl}>{product.productDisplayName}</a> : product.productDisplayName}
              </h1>
              <p className='text-mwgray text-left'>{product.throttledStatus}</p>
              <p className='text-mwgray text-left'>{product.campaignName}</p>
            </section>

            <div className='w-36 flex justify-between space-x-4'>
              <section className='flex flex-col items-center'>
                <FontAwesomeIcon icon={faArrowDown} className='h-4 mb-1 text-mwgray' />
                <div className='text-mwgray-l text-sm font-bold'>Download</div>
                <p className='text-mwgray text-md'>{product.downloadSpeedMbps}</p>
              </section>

              <section className='flex flex-col items-center'>
                <FontAwesomeIcon icon={faArrowUp} className='h-4 mb-1 text-mwgray' />
                <div className='text-mwgray-l text-sm font-bold'>Upload</div>
                <p className='text-mwgray text-md'>{product.uploadSpeedMbps}</p>
              </section>
            </div>
          </div>

          {/* price, button, provider image */}
          <div className='flex justify-between items-center space-x-2'>
            {!product.hasPreProduct && <PriceDisplay price={product.productDisplayPrice} />}
            {product.hasPreProduct && <PreProductPriceDisplay price={product.productDisplayPrice} preProduct={product.preProduct} />}

            <section className='outline-none relative w-28 h-12'>
              <Image src={provider.logoUrl} alt='logo' objectFit='contain' layout='fill' className='p-4' />
            </section>
            <section className='outline-none'>
              <button className={`${outerStyle} product-card text-sm focus:outline-none ${addedStyle}`} onClick={() => handleCardClick()}>
                <div className={`block hover:no-underline ${innerStyle} ${padding}`}>{callToActionText}</div>
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {product && provider && (
        <>
          <MobileView />
          <DesktopView />
        </>
      )}
    </>
  );
}
