import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from '../styles/FibreFilterProductCards.module.css';
import MultipleRangeSelector, { iNumAdd } from './MultipleRangeSelector';
import DealTypeSelector from './DealTypeSelector';
import { ICampaign } from '../services/campaignsService';
import FibreProviderBannerSelectorMobile, { iProvAdd } from './FibreProviderBannerSelectorMobile';
import FibreProviderCard from './FibreProviderCard';

interface iProps {
  selectedCampaigns: ICampaign[];
  selectedProviders: iProvAdd[];
  selectedDataRangeSet: iNumAdd[];
  selectedPriceRangeSet: iNumAdd[];
  availableCampaigns: ICampaign[];

  updateDealType: (e: any) => void;
  updateVisibleProvider: (e: iProvAdd[]) => void;
  updateVisibleDataRange: (e: iNumAdd[]) => void;
  updateVisiblePriceRange: (e: iNumAdd[]) => void;
  hasCoverageSearch: boolean;
  showProductsCampainFilter: boolean;
}

interface iDisplayProps {
  providers: iProvAdd[];
  updateSelected: (e: any) => void;
}

const AvailableProvidersDisplay = (props: iDisplayProps) => {
  const { providers, updateSelected } = props;

  // console.log('FUNC:', providers);

  return (
    <div className='flex flex-wrap justify-end w-full laptop:w-auto'>
      {providers.map((p, i) => {
        // console.log('P', p);
        return (
          <FibreProviderCard
            // `${p.code}-${i.toString()}`
            key={i}
            fromCarousel={false}
            provider={p}
            selected={providers.length === 1 ? true : p.selected}
            updateSelected={(e: any) => updateSelected(e)}
            containerStyles='px-3 laptop:px-2 '
            styles='h-10 laptop:w-24 m-auto px-2 flex items-center '
          />
        );
      })}
    </div>
  );
};

export default function FibreFilterProducts(props: iProps) {
  const {
    // availableProviders,
    availableCampaigns,
    hasCoverageSearch,
    selectedCampaigns,
    selectedDataRangeSet,
    selectedPriceRangeSet,
    selectedProviders,
    showProductsCampainFilter,
    updateVisibleDataRange,
    updateVisiblePriceRange,
    updateDealType,
    updateVisibleProvider,
  } = props;

  const isMobile = useMediaQuery({ maxDeviceWidth: 1139 });

  useEffect(() => {
    // console.log('selected', selectedDataRangeSet, selectedPriceRangeSet, selectedProviders);
  }, [availableCampaigns, hasCoverageSearch, selectedCampaigns, selectedDataRangeSet, selectedPriceRangeSet, selectedProviders]);

  function handleChangeProvs(provider: iProvAdd) {
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
      <div className={`hidden xl:flex flex-col justify-center items-center w-full mt-2`}>
        {showProductsCampainFilter ? (
          <h3 id={`${!isMobile ? 'FibreHeading' : ''}`} className='font-semibold text-mwgray-xd mb-3'>
            Choose a Fibre Package:
          </h3>
        ) : (
          <h3 id={`${!isMobile ? 'FibreHeading' : ''}`} className='font-semibold text-mwgray-xd mb-3'>
            These are the available Mweb products:
          </h3>
        )}
        {/* items-center xl:inline-grid gap-x-4 grid-cols-1 xl:grid-cols-3 */}
        <div className={`${styles.maxWidth} flex flex-row justify-between `}>
          <div className='flex flex-col justify-start items-start'>
            <p>Filter By:</p>
            <div className='w-full xl:w-auto flex justify-start items-start'>
              <MultipleRangeSelector
                buttonLabel='Speed'
                popoverStyle='absolute z-10'
                // ranges={FIBRE_SPEED_RANGES}
                selectedRanges={selectedDataRangeSet}
                updateSelected={(e) => updateVisibleDataRange(e)}
              />

              <MultipleRangeSelector
                buttonLabel='Price'
                popoverStyle='absolute z-10'
                // ranges={FIBRE_PRICE_RANGES}
                selectedRanges={selectedPriceRangeSet}
                updateSelected={(e) => updateVisiblePriceRange(e)}
              />
            </div>
          </div>

          {showProductsCampainFilter && (
            <div className='flex-col justify-start items-start'>
              <p>Deal Type:</p>
              <DealTypeSelector type='fibre' campaignCodes={availableCampaigns} visibleCampaigns={selectedCampaigns} updateDealType={(e) => updateDealType(e)} />
            </div>
          )}

          <div className='flex flex-col justify-end  content-end items-end text-right mt-2 xl:mt-0'>
            <p>
              {hasCoverageSearch
                ? selectedProviders?.length > 1
                  ? 'Fibre Infrastructure Providers available:'
                  : 'Fibre Infrastructure Provider available:'
                : selectedProviders?.length > 1
                ? 'Selected Fibre Infrastructure Providers:'
                : 'Selected Fibre Infrastructure Provider:'}
            </p>

            <AvailableProvidersDisplay providers={selectedProviders} updateSelected={(e) => handleChangeProvs(e)} />
          </div>
        </div>
      </div>
    );
  };

  const MobileView = () => {
    return (
      <div className={`xl:hidden w-full px-3 tablet:px-4 flex flex-col justify-center items-center`}>
        {showProductsCampainFilter ? (
          <h3 id={`${isMobile ? 'FibreHeading' : ''}`} className='font-semibold text-mwgray-xd mb-5'>
            Choose a Fibre Package:
          </h3>
        ) : (
          <h3 id={`${isMobile ? 'FibreHeading' : ''}`} className='font-semibold text-lg text-mwgray-xd mb-5'>
            These are the available Mweb products:
          </h3>
        )}
        <div className='w-full flex flex-col justify-start items-start'>
          <p className='w-full text-center'>Filter By:</p>
          <div className={`w-full grid gap-3 grid-cols-3 laptop:flex laptop:justify-start laptop:items-start`}>
            <FibreProviderBannerSelectorMobile
              selectedProviders={selectedProviders}
              buttonLabel={'Providers'}
              popoverStyle={'w-[175px] absolute left-0 z-10'}
              updateSelected={() => {}}
            />

            <MultipleRangeSelector
              buttonLabel='Price'
              popoverStyle='w-[175px] absolute left-0 z-10'
              selectedRanges={selectedPriceRangeSet}
              updateSelected={(e) => updateVisiblePriceRange(e)}
            />

            <DealTypeSelector type='fibre' visibleCampaigns={selectedCampaigns} campaignCodes={availableCampaigns} updateDealType={(e) => updateDealType(e)} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <DesktopView />
      <MobileView />
    </div>
  );
}
