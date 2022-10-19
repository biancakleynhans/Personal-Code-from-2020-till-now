import React, { useEffect } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import MwebButton from '../shared/MwebButton';

interface iBoxProps {
  toggleGetNotified?: () => void;
  router?: NextRouter;
  preOrderFibre?: any;
  outerClass: string;
  innerClass: string;
  headingClass: string;
}

interface iProps {
  fibre: boolean;
  lte: boolean;
  dsl: boolean;
  fibreInProgress: boolean;
  toggleFibre: () => void;
  toggleLte: () => void;
  preOrderFibre: () => void;
  fromPage: string;
}

const available = {
  outer: 'border-2 border-mwblue w-11/12 text-center m-2 laptop:w-4/12',
  inner: 'w-full bg-mwblue text-white text-lg font-semibold px-3 py-2',
  heading: 'text-lg font-semibold',
};

const unavailable = {
  outer: 'border-2 border-mwgray-l w-11/12 text-center m-2 laptop:w-4/12',
  inner: 'w-full text-mwblue text-lg px-3 py-2',
  heading: 'text-lg',
};

// Fibre Available
const FibreAvaliableBox = (props: iBoxProps) => {
  const { outerClass, innerClass, headingClass, router } = props;
  return (
    <div className={`${outerClass}`}>
      <div className={`${innerClass}`}>
        <h4 className={`${headingClass}`}>Fibre is ready for installation!</h4>
      </div>
      <MwebButton
        containerStyle=''
        disabled={false}
        type='button'
        id=''
        variant='blue'
        addedStyle='mt-3 mb-3 ml-auto mr-auto w-[136px]'
        padding='py-3 px-4'
        click={() => router?.push('/fibre')}
      >
        <span className='font-semibold'>View Products</span>
      </MwebButton>
    </div>
  );
};

// Fibre Unavaliable
const FibreUnavaliableBox = (props: iBoxProps) => {
  const { outerClass, innerClass, headingClass, toggleGetNotified } = props;
  return (
    <div className={`${outerClass}`}>
      <div className={`${innerClass}`}>
        <h4 className={`${headingClass}`}>Fibre is not available yet</h4>
      </div>
      <MwebButton
        containerStyle=''
        disabled={false}
        type='button'
        id=''
        variant='blue'
        addedStyle='mt-3 mb-3 ml-auto mr-auto w-[136px]'
        padding='py-3 px-4'
        click={() => toggleGetNotified?.()}
      >
        <span className='font-semibold'>Get Notified</span>
      </MwebButton>
    </div>
  );
};

// Fibre in progress
const FibreInProgressBox = (props: iBoxProps) => {
  const { outerClass, innerClass, headingClass, preOrderFibre } = props;
  return (
    <div className={`${outerClass}`}>
      <div className={`${innerClass}`}>
        <h4 className={`${headingClass}`}>Fibre is being rolled out in your suburb</h4>
      </div>
      <MwebButton
        containerStyle=''
        disabled={false}
        type='button'
        id=''
        variant='blue'
        addedStyle='mt-3 mb-3 ml-auto mr-auto w-[145px]'
        padding='py-3 px-4'
        click={() => preOrderFibre?.()}
      >
        <span className='font-semibold'>Pre-Order Fibre</span>
      </MwebButton>
    </div>
  );
};

// LTE Available
const LteAvaliableBox = (props: iBoxProps) => {
  const { outerClass, innerClass, headingClass, router } = props;
  return (
    <div className={`${outerClass}`}>
      <div className={`${innerClass}`}>
        <h4 className={`${headingClass}`}>You can get LTE!</h4>
      </div>
      <MwebButton
        containerStyle=''
        disabled={false}
        type='button'
        id=''
        variant='blue'
        addedStyle='mt-3 mb-3 ml-auto mr-auto w-[136px]'
        padding='py-3 px-4'
        click={() => {
          if (router?.pathname === '/lte') {
            const heading = document.getElementById(`${process.env.NEXT_PUBLIC_LTE_DOCK_ANCHOR}`);
            heading?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          } else router?.push('/lte');
        }}
      >
        <span className='font-semibold'>View Products</span>
      </MwebButton>
    </div>
  );
};

// LTE Unavaliable
const LteUnavaliableBox = (props: iBoxProps) => {
  const { outerClass, innerClass, headingClass, toggleGetNotified } = props;
  return (
    <div className={`${outerClass}`}>
      <div className={`${innerClass}`}>
        <h4 className={`${headingClass}`}>LTE is not available yet</h4>
      </div>
      <MwebButton
        containerStyle=''
        disabled={false}
        type='button'
        id=''
        variant='blue'
        addedStyle='mt-3 mb-3 ml-auto mr-auto w-[136px]'
        padding='py-3 px-4'
        click={() => toggleGetNotified?.()}
      >
        <span className='font-semibold'>Get Notified</span>
      </MwebButton>
    </div>
  );
};

// DSL available
const Dsl = () => {
  return (
    <Link href='/pure-dsl'>
      <a className='text-mwblue text-lg m-4 dsl-is-available-link-click' data-test-id='dsl-is-available-link-click'>
        <b>Pure DSL is available</b>
      </a>
    </Link>
  );
};

export default function CoverageCelebrationBoxes(props: iProps) {
  const { dsl, fibre, fibreInProgress, lte, preOrderFibre, toggleFibre, toggleLte } = props;
  const router = useRouter();

  useEffect(() => {
    // console.log('%c ======== CELEBRATION BOXES ========', 'color: red; font-weight: 900');
    // console.log(fibre, lte, dsl, fibreInProgress);
  }, [fibre, lte, dsl, fibreInProgress]);

  return (
    <div className='flex flex-col items-center justify-center my-2 lg:mt-6 xl:flex-row tablet:mx-8'>
      {fibre && !fibreInProgress && (
        <>
          {/* fibre */}
          {fibre ? (
            <FibreAvaliableBox router={router} outerClass={available.outer} innerClass={available.inner} headingClass={available.heading} />
          ) : (
            <FibreUnavaliableBox toggleGetNotified={toggleFibre} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          )}
          {/* LTE */}
          {lte ? (
            <LteAvaliableBox router={router} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          ) : (
            <LteUnavaliableBox toggleGetNotified={toggleLte} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          )}
          {/* DSL */}
          {dsl && <Dsl />}
        </>
      )}

      {fibre && fibreInProgress && (
        <>
          {/* fibre */}
          {fibre ? (
            <FibreAvaliableBox router={router} outerClass={available.outer} innerClass={available.inner} headingClass={available.heading} />
          ) : (
            <FibreUnavaliableBox toggleGetNotified={toggleFibre} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          )}
          {/* LTE */}
          {lte ? (
            <LteAvaliableBox router={router} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          ) : (
            <LteUnavaliableBox toggleGetNotified={toggleLte} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          )}
          {/* DSL */}
          {dsl && <Dsl />}
        </>
      )}

      {!fibre && fibreInProgress && (
        <>
          {/* LTE */}
          {lte && <LteAvaliableBox router={router} outerClass={available.outer} innerClass={available.inner} headingClass={available.heading} />}
          {/* Fibre in progress */}
          {fibreInProgress && (
            <FibreInProgressBox
              toggleGetNotified={toggleFibre}
              preOrderFibre={preOrderFibre}
              outerClass={unavailable.outer}
              innerClass={unavailable.inner}
              headingClass={unavailable.heading}
            />
          )}
          {/* DSL */}
          {dsl && <Dsl />}
        </>
      )}

      {!fibre && !fibreInProgress && lte && (
        <>
          {/* LTE */}
          {lte ? (
            <LteAvaliableBox router={router} outerClass={available.outer} innerClass={available.inner} headingClass={available.heading} />
          ) : (
            <LteUnavaliableBox toggleGetNotified={toggleLte} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          )}
          {/* No Fibre */}
          <FibreUnavaliableBox toggleGetNotified={toggleFibre} outerClass={unavailable.outer} innerClass={unavailable.inner} headingClass={unavailable.heading} />
          {/* DSL */}
          {dsl && <Dsl />}
        </>
      )}
    </div>
  );
}
