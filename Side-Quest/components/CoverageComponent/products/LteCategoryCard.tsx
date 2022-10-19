import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/LteCategoryCard.module.css';
import { Helpers } from '../utils/helpers';
import { Utilities } from '../utils/utilities';
import { PreProductPriceDisplay, PriceDisplay } from './FibreCategoryCard';
import ProductHeroBanner from './ProductHeroBanner';

interface iProps {
  product: any;
  typeDisplay: string;
  provider: any;
  providersStats: any[];
  hasCoverageSearchResults: boolean;
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

export default function LteCategoryCard(props: iProps) {
  const { hasCoverageSearchResults, product, provider, typeDisplay, page, providersStats, useOverRideFunc, overRideForProductClicked, productButtonText } = props;
  const router = useRouter();
  const NormalOuter = `${page === 'mop-step2' ? styles.cardMinWidthMOP : styles.cardMinWidth}`;

  let status = providersStats.filter((p) => p?.code === provider?.coverageCode)[0]?.status;
  let callToActionText = productButtonText.length > 0 ? productButtonText : status !== 'live' ? 'pre-order' : 'View more';

  // TODO: Figure out why we are getting the null products
  let capDisplayValue = '';
  if (!product.hasTeraByteValue) {
    if (product.standardCapGB === product.nighttimeCapGB) {
      capDisplayValue = product.standardCapGB + product.nighttimeCapGB + 'GB';
    } else if (product.standardCapGB > product.nighttimeCapGB) {
      capDisplayValue = product.nighttimeCapGB + product.nighttimeCapGB + 'GB';
    }
  } else {
    capDisplayValue = product.standardCapGB + product.nighttimeCapGB + 'TB';
  }

  let dataDisplay = capDisplayValue === '' ? product.nighttimeCapGB + product.nighttimeCapGB + 'GB' : page !== 'campaign' ? capDisplayValue : 'Uncapped';

  const [isAB, setisAB] = useState<boolean>(false);

  useEffect(() => {
    let check = router.pathname.includes('internet');
    setisAB(check);
  }, [router]);

  useEffect(() => {}, [isAB]);

  useEffect(() => {
    // console.log('Card', page, product, provider);
  }, [hasCoverageSearchResults, product, provider]);

  useEffect(() => {
    // console.log('Card', providersStats, product.productDisplayPrice, product.preProduct?.preProductRate, product.hasPreProduct);
  }, [providersStats, productButtonText, typeDisplay]);

  function handleCardClick() {
    if (useOverRideFunc) {
      // console.log('handle override here');
      overRideForProductClicked();
    } else {
      if (product?.newUrl) {
        router.push(product.newUrl);
      } else {
        console.error('No product URL found to redirect to.')
      }
    }

  }

  // //Desktop View
  const DesktopView = () => {
    return (
      <div className={isAB ? AB_outer : `${NormalOuter} ${normalOuter}`} onClick={() => handleCardClick()}>
        {product.isHero && (
          <div className='w-full'>
            <ProductHeroBanner
              hasCoverageSearched={true}
              isHero={product.isHero}
              heroOption={product.heroOption}
              heroTagline={product.heroTagline ? product.heroTagline : product.heroTagLine}
            />
          </div>
        )}
        {/* <LinkWrapper href={productUrl} category='lte' linkWrapperOnClick={onLinkWrapperClick} product={linkWrapperProduct} page={page} ctaText={callToActionText}> */}
        <div className='product-card bg-white flex flex-col justify-evenly min-h-[134px] max-h-[134px] border border-mwgray mwCardShadow px-4 py-1 hover:mwCardHoverShadow'>
          <div className='flex justify-between'>
            <section className='flex flex-col justify-start items-start text-left'>
              <h1 className='text-mwgray-xd text-lg font-bold'>
                {isAB && !hasCoverageSearchResults && product.productDisplayName ? <a href={product.newUrl}>{product.productDisplayName}</a> : product.productDisplayName}
                {isAB && !hasCoverageSearchResults && product.friendlyName ? <a href={product.newUrl}>{product.friendlyName}</a> : product.friendlyName}
              </h1>

              {product?.dealName ? Helpers.getFallBackCampaignName(product?.campaignCode, product?.dealName) : product?.productName ? product?.productName : ''}
            </section>

            <section className='flex flex-col justify-center items-center w-44 tablet:w-40 mt-1'>
              <div className='text-mwgray-l font-semibold text-sm'>Data</div>
              <p className='text-mwgray text-md'>{Utilities.dataDisplay(dataDisplay, dataDisplay.includes('TB'))}</p>
            </section>
          </div>

          <div className='flex justify-between items-center'>
            {product.hasPreProduct ? (
              <PreProductPriceDisplay price={product.productDisplayPrice ? product.productDisplayPrice : product.productRate} preProduct={product.preProduct} />
            ) : (
              <PriceDisplay price={product.productDisplayPrice ? product.productDisplayPrice : product.productRate} />
            )}

            {provider && provider.logoUrl && (
              <section className='outline-none relative w-24 h-10'>
                {provider && provider.logoUrl && <Image src={provider.logoUrl} alt='logo' objectFit='contain' layout='fill' className='p-4' />}
              </section>
            )}

            <section className='outline-none'>
              <button className={`${outerStyle} product-card text-sm focus:outline-none ${addedStyle}`} onClick={() => handleCardClick()}>
                <div className={`block hover:no-underline ${innerStyle} ${padding}`}>{callToActionText}</div>
              </button>
            </section>
          </div>
        </div>
        {/* </LinkWrapper> */}
      </div>
    );
  };

  const MobileView = () => {
    return (
      <button className='w-full flex flex-col justify-end  tablet:px-4 py-4 laptop:hidden animate-productCardEntry' onClick={() => handleCardClick()}>
        {product.isHero && (
          <div className='w-full'>
            <ProductHeroBanner
              hasCoverageSearched={hasCoverageSearchResults}
              isHero={product.isHero}
              heroOption={product.heroOption}
              heroTagline={product.heroTagline ? product.heroTagline : product.heroTagLine}
            />
          </div>
        )}
        <div className='w-full product-card flex flex-col justify-between min-h-[154px] border border-mwgray mwCardShadow px-4 py-1 hover:mwCardHoverShadow'>
          <div className='flex justify-between'>
            <section className='flex flex-col justify-start'>
              <h1 className='text-mwgray-xd text-base font-bold text-left'>
                {isAB && !hasCoverageSearchResults ? <a href={product.newUrl}> {product?.productDisplayName}</a> : product?.productDisplayName}
              </h1>
              <p className='text-mwgray text-left'>
                {product?.dealName ? Helpers.getFallBackCampaignName(product?.campaignCode, product?.dealName) : product?.productName ? product?.productName : ''}
              </p>
            </section>
          </div>

          <div className='flex justify-between items-center'>
            {product.hasPreProduct ? (
              <PreProductPriceDisplay price={product.productDisplayPrice ? product.productDisplayPrice : product.productRate} preProduct={product.preProduct} />
            ) : (
              <PriceDisplay price={product.productDisplayPrice ? product.productDisplayPrice : product.productRate} />
            )}
            <section className='flex flex-col justify-center items-start mb-1 mr-2'>
              <div className='text-mwgray-l font-semibold text-sm'>Data</div>
              <p className='text-mwgray text-md'>{Utilities.dataDisplay(dataDisplay, dataDisplay.includes('TB'))}</p>
            </section>
          </div>

          <div className='flex justify-between items-center'>
            <section className='outline-none relative w-16 h-8'>
              {provider && provider.logoUrl && <Image src={provider.logoUrl} alt='logo' objectFit='contain' layout='fill' className='p-4' />}
            </section>

            <section className='outline-none'>
              <button className={`${outerStyle} product-card text-sm focus:outline-none ${addedStyle}`} onClick={() => handleCardClick()}>
                <div className={`block hover:no-underline ${innerStyle} ${padding}`}>{callToActionText}</div>
              </button>
            </section>
          </div>
        </div>
      </button>
    );
  };

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}
