import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import customStyles from '../styles/FibreProviderCard.module.css';
import { iProvAdd } from './FibreProviderBannerSelectorMobile';

interface iProps {
  provider: iProvAdd;
  fromCarousel: boolean;
  selected: boolean;
  updateSelected: (e: iProvAdd) => void;
  containerStyles: string;
  styles: string;
}

export default function FibreProviderCard(props: iProps) {
  const { containerStyles, fromCarousel, provider, selected, styles, updateSelected } = props;

  const router = useRouter();
  const classNameStyle = `${styles} relative overflow-hidden h-12 cursor-pointer my-1 border border-mwgray-l `;
  let classToUse = selected ? `${classNameStyle} filter grayscale-0 hover:grayscale ` : `${classNameStyle} filter grayscale hover:grayscale-0`;

  useEffect(() => {
    // console.log('CARD', provider);
  }, [props]);

  return (
    <div className={`${containerStyles}`}>
      <div className={`${customStyles.card} ${classToUse}`}>
        {provider.logoUrl &&
          (fromCarousel ? (
            <div className='relative px-4 pt-2 pb-1'>
              <Image
                // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${provider.logoUrl}`}
                width={'100%'}
                height={'100%'}
                src={`${provider.logoUrl}`}
                alt={provider.name}
                onClick={() => {
                  updateSelected(provider);

                  const heading = document.getElementById(
                    router.pathname === '/lte' ? `${process.env.NEXT_PUBLIC_LTE_DOCK_ANCHOR}` : `${process.env.NEXT_PUBLIC_FIBRE_DOCK_ANCHOR}`
                  );
                  heading?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  });
                }}
              />
            </div>
          ) : (
            <div>
              <Image
                className='object-contain'
                layout='fill'
                // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${provider.logoUrl}`}
                src={`${provider.logoUrl}`}
                alt={provider.name}
                onClick={() => {
                  updateSelected(provider);

                  const heading = document.getElementById(
                    router.pathname === '/lte' ? `${process.env.NEXT_PUBLIC_LTE_DOCK_ANCHOR}` : `${process.env.NEXT_PUBLIC_FIBRE_DOCK_ANCHOR}`
                  );
                  heading?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  });
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
