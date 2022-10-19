import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { iProvAdd } from './FibreProviderBannerSelectorMobile';
import { lteProviders } from '../services/providerService';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import styles from '../styles/LteProviderCarousel.module.css';
import 'react-multi-carousel/lib/styles.css';
import LteProviderCard from './LteProviderCard';

const responsive = {
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 641 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1376, min: 1025 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 2047, min: 1377 },
    items: 4,
  },
  '2k': {
    breakpoint: { max: 3839, min: 2048 },
    items: 4,
  },
  '4k': {
    breakpoint: { max: 10000, min: 3840 },
    items: 4,
  },
};

const ArrowFix = (arrowProps: any) => {
  const { carouselState, children, ...restArrowProps } = arrowProps;
  return <span {...restArrowProps}> {children} </span>;
};

interface iProps {
  visibleProviders: iProvAdd[];
  updateSelected: (e: any) => void;
  outerStyles: string;
  innerStyles: string;
  hasCoverageSearch: boolean;
}

export default function LteProviderCarousel(props: iProps) {
  const { hasCoverageSearch, innerStyles, outerStyles, visibleProviders, updateSelected } = props;
  const isTablet = useMediaQuery({ maxDeviceWidth: 1024 });

  useEffect(() => {
    // console.log('%c = GETTING INFO =', 'color: lightblue; font-weight: 900');
    // console.log(hasCoverageSearch, visibleProviders, lteProviders);
  }, [hasCoverageSearch, innerStyles, outerStyles, visibleProviders]);

  return (
    <div className={`${outerStyles}`}>
      <div className={`${innerStyles}`}>
        <Carousel
          arrows={!isTablet}
          autoPlay={!isTablet}
          autoPlaySpeed={5000}
          centerMode={!isTablet}
          swipeable={!isTablet}
          customRightArrow={
            <ArrowFix className='absolute right-0 bg-white py-4 pl-2 laptop:pl-5'>
              <Image
                alt='right'
                src='/next-public/images/testamonial-arrow-right.png'
                width={23}
                height={42}
                className='cursor-pointer opacity-50 hover:opacity-100 duration-200'
              />
            </ArrowFix>
          }
          customLeftArrow={
            <ArrowFix className='absolute left-0 bg-white py-4 pr-2 laptop:pr-5'>
              <Image alt='left' src='/next-public/images/testamonial-arrow-left.png' width={23} height={42} className='cursor-pointer opacity-50 hover:opacity-100 duration-200' />
            </ArrowFix>
          }
          infinite
          slidesToSlide={2}
          responsive={responsive}
          containerClass={`${hasCoverageSearch ? styles.lteCarouselFlexEnd : styles.lteCarouselFlexCenter}`}
          itemClass={styles.itemWidth}
        >
          {/* {lteProviderCards(lteProviders, visibleProviders, hasCoverageSearch, (e: any) => handleSelected(e))} */}
          {lteProviders.map((p, i) => {
            let isMatch = visibleProviders.filter((s) => s.coverageCode === p.coverageCode).length > 0 ? true : false;
            // console.log('P', p.coverageCode, isMatch);
            return (
              <LteProviderCard
                containerStyles='flex flex-row justify-between'
                key={i}
                provider={p}
                selected={isMatch}
                updateSelected={(e) => updateSelected(e)}
                hasResults={hasCoverageSearch}
                styles={`w-10/12 laptop:w-full h-12 flex flex-row justify-center m-auto py-2 laptop:my-1 laptop:mx-2`}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
