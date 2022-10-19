import React, { useEffect } from 'react';
import Image from 'next/image';
import { Helpers } from '../utils/helpers';
import { ILteProvider } from '../services/providerService';

interface iProps {
  provider: ILteProvider;
  selected: boolean;
  updateSelected: (e: any) => void;
  hasResults: boolean;
  containerStyles: string;
  styles: string;
}

export default function LteProviderCard(props: iProps) {
  const { containerStyles, hasResults, provider, selected, styles, updateSelected } = props;

  useEffect(() => {
    // console.log('Card', hasResults, provider, selected);
  }, [hasResults, provider, selected]);

  let className = `${styles} cursor-pointer my-3 border mwCardShadow border-mwgray-l `;
  if (selected) {
    className += ` filter grayscale-0 ${
      !Helpers.isMobileDevice() ? 'hover:grayscale' : '' // remove hover effect on mobile
    }`;
  } else {
    // 'hasResults' variable used for coverage search result only
    if (!hasResults)
      className += ` filter grayscale-0 ${
        !Helpers.isMobileDevice() ? 'hover:grayscale' : '' // remove hover effect on mobile
      } `;
    else
      className += ` filter grayscale ${
        !Helpers.isMobileDevice() ? 'hover:grayscale' : '' // remove hover effect on mobile
      }`;
  }

  return (
    <div className={`${containerStyles}`}>
      {provider.logoUrl && (
        <div className={className}>
          <Image
            className='object-contain w-full h-full'
            width={'100%'}
            height={'100%'}
            src={`${provider.logoUrl}`}
            alt={provider.name}
            onClick={() => {
              updateSelected(provider);
              const heading = document.getElementById(`${process.env.NEXT_PUBLIC_LTE_DOCK_ANCHOR}`);
              heading?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
