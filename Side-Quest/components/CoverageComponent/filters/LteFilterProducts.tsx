import styles from '../styles/LteFilterProductCards.module.css';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { iProvAdd } from './FibreProviderBannerSelectorMobile';
import MultipleRangeSelector, { iNumAdd } from './MultipleRangeSelector';
import DealTypeSelector from './DealTypeSelector';
import LteProviderCarousel from './LteProviderCarousel';
import LteProviderBannerSelectorMobile from './LteProviderBannerSelectorMobile';
import { ILteCampaignCodes } from '../utils/types';

interface iProps {
  hasCoverageSearch: boolean;
  availableCampaigns: ILteCampaignCodes[];
  selectedCampaigns: any[];
  selectedProviders: iProvAdd[];
  selectedDataRangeSet: iNumAdd[];
  selectedPriceRangeSet: iNumAdd[];

  updateDealType: (e: any[]) => void;
  updateVisibleProvider: (e: iProvAdd[]) => void;
  updateVisibleDataRange: (e: iNumAdd[]) => void;
  updateVisiblePriceRange: (e: iNumAdd[]) => void;
}

export default function LteFilterProductCards(props: iProps) {
  const {
    availableCampaigns,
    hasCoverageSearch,
    selectedCampaigns,
    selectedDataRangeSet,
    selectedPriceRangeSet,
    selectedProviders,
    updateVisibleDataRange,
    updateVisiblePriceRange,
    updateDealType,
    updateVisibleProvider,
  } = props;

  const isMobile = useMediaQuery({ maxDeviceWidth: 1139 });

  useEffect(() => {
    // console.log('LTE FILTER ', selectedDataRangeSet);
  }, [hasCoverageSearch, selectedCampaigns, selectedDataRangeSet, selectedPriceRangeSet, selectedProviders, availableCampaigns]);

  function handleChange(provider: iProvAdd) {
    // console.log('handle provider change ', provider, selectedProviders);

    let isFirst = selectedProviders.filter((p) => p.selected).length === selectedProviders.length;
    // console.log('is First Click ?', isFirst);

    // 1.first check if all the providers are active ->this is the first click, and whichever provider was clicked on must remain active, and disable the rest.
    if (isFirst) {
      let clone = selectedProviders;
      clone.map((c) => {
        if (c.coverageCode !== provider.coverageCode) {
          c.selected = !c.selected;
        } else {
          return c;
        }
      });

      // console.log('clone', clone);
      updateVisibleProvider(clone);
    }
    // 2. If it's not the first click, then just toggle the selected provider. ( toggle it to opposite of what it was )
    else {
      let clone = selectedProviders;
      clone.map((c) => {
        if (c.coverageCode === provider.coverageCode) {
          c.selected = !c.selected;
        } else {
          return c;
        }
      });

      // console.log('clone', clone);
      updateVisibleProvider(clone);
    }
  }

  const DesktopView = () => {
    return (
      <div className={`hidden xl:flex flex-col justify-center items-center w-full mt-8`}>
        <h3 id={`${!isMobile ? 'LteHeading' : ''}`} className='font-semibold text-mwgray-xd mb-5'>
          Choose a LTE Package:
        </h3>
        <div className={`${styles.maxWidth} items-center xl:inline-grid gap-x-4 grid-cols-1 xl:grid-cols-3`}>
          <div className='flex flex-col justify-start items-start'>
            <p>Filter By:</p>
            <div className='w-full xl:w-auto flex justify-start items-start'>
              <MultipleRangeSelector popoverStyle='absolute z-10' buttonLabel='Data' selectedRanges={selectedDataRangeSet} updateSelected={(e) => updateVisibleDataRange(e)} />
              <MultipleRangeSelector popoverStyle='absolute z-10' buttonLabel='Price' selectedRanges={selectedPriceRangeSet} updateSelected={(e) => updateVisiblePriceRange(e)} />
            </div>
          </div>
          <div className='flex-col justify-start items-start'>
            <p className='xl:ml-7'>Deal Type:</p>
            <DealTypeSelector type='lte' campaignCodes={availableCampaigns} visibleCampaigns={selectedCampaigns} updateDealType={(e) => updateDealType(e)} />
          </div>
          {hasCoverageSearch && (
            <div className='flex-col justify-start items-start text-right mt-2 xl:mt-0'>
              <p>Selected LTE Providers:</p>
              <LteProviderCarousel
                visibleProviders={selectedProviders}
                updateSelected={(e) => handleChange(e)}
                outerStyles='w-full flex justify-end items-end'
                innerStyles='w-full max-w-xl md:max-w-6xl m-auto'
                hasCoverageSearch={hasCoverageSearch}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const MobileView = () => {
    return (
      <div className={`xl:hidden w-full px-3 tablet:px-4 flex flex-col justify-center items-center`}>
        <h3 id={`${isMobile ? 'LteHeading' : ''}`} className='font-semibold text-mwgray-xd mb-5'>
          Choose a LTE Package:
        </h3>
        <div className='w-full flex flex-col justify-start items-start'>
          <p className='w-full text-center'>Filter By:</p>
          <div className='w-full grid gap-3 grid-cols-4 laptop:flex laptop:justify-start laptop:items-start'>
            <LteProviderBannerSelectorMobile visibleProviders={selectedProviders} updateSelectedProviders={(e: any) => handleChange(e)} hasCoverageSearch={hasCoverageSearch} />

            <MultipleRangeSelector
              buttonLabel='Data'
              popoverStyle='w-[175px] absolute left-0 z-10'
              selectedRanges={selectedDataRangeSet}
              updateSelected={(e) => updateVisibleDataRange(e)}
            />

            <MultipleRangeSelector
              buttonLabel='Price'
              popoverStyle='w-[175px] absolute left-0 z-10'
              selectedRanges={selectedPriceRangeSet}
              updateSelected={(e) => updateVisiblePriceRange(e)}
            />

            <DealTypeSelector type='lte' campaignCodes={availableCampaigns} visibleCampaigns={selectedCampaigns} updateDealType={(e) => updateDealType(e)} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
}
