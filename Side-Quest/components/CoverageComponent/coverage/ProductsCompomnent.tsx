/* 
  HANDLES ALL PRODUCT RELATED LOGIC AND DISPLAYS. 
  THIS COMPONENT RECIEVES UNFILTERED PRODUCTS AND PROVIDERS AND THEN SORTS FILTERS AND DISPLAYS ALL RELEVENT PRODUCTS 
  ALSO HANDLES CLIENT FILTERING BASED ON THE TYPE OF PRODUCTS BEING DISPLAYED TO THE USERS

 
*/

import React, { useEffect, useState } from 'react';
import { IProviderStatus } from '../interfaces/Coverage';
import { ICampaign } from '../services/campaignsService';
import { IFibreProvider } from '../services/providerService';
import FibreFilterProducts from '../filters/FibreFilterProducts';
import { iProvAdd } from '../filters/FibreProviderBannerSelectorMobile';
import LteFilterProductCards from '../filters/LteFilterProducts';
import { iNumAdd } from '../filters/MultipleRangeSelector';
import FibreProductGrid from '../products/FibreProductGrid';
import LteProductsGrid from '../products/LteProductGrid';

interface iProps {
  allProducts: IProduct[];
  page: string;
  fibre: boolean;
  lte: boolean;
  fip: boolean;
  hasResults: boolean;
  visibleProviders: {
    stats: IProviderStatus[];
    details: iProvAdd[];
  };
  allFibreCampaigns: ICampaign[];
  showProductsCampainFilter: boolean;
  showProductFilters: boolean;
  productButtonText: string;
  useOverRideFunc: boolean;
  overRideForProductClicked: () => void;
}

export interface iCampAdd {
  key: string;
  label: string;
  selected: boolean;
}

enum HeroOption {
  INCOGNITO_JOURNEY = 'IncognitoJourneyOnly',
  COVERAGE_SEARCH_JOURNEY = 'CoverageSearchedJourneyOnly',
  INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY = 'AllUserJourneys',
  NOT_APPLICABLE = 'na',
}

interface IPreProduct {
  preProductCode: string;
  preProductName: string;
  preProductFriendlyName: string;
  preProductInvoiceRollupDescription: string;
  preProductRate: number;
  preProductDiscountAmount: number;
  preProductDiscountType: string;
  preProductDiscountedProductRate: number;
  preProductDiscountPeriodInDays: number;
  preProductDiscountSavings: number;
  preProductDisplay: string;
}

export interface IProduct {
  providerName: string | null;
  campaignCode: string | null;
  campaignName: string | null;
  promoCode: string | null;
  coverageStatusDisplayValue: string | null;
  coverageStatusOptionKey: string | null;
  promoCodeCategory: string | null;
  promoCodeSubcategory: string | null;
  providerCode: string | null;
  coverageCode: string | null;
  productCode: string | null;
  productDisplayName: string | null;
  productDisplayPrice: number | null;
  productChargePeriod: string | null;
  downloadSpeedMbps: number | null;
  uploadSpeedMbps: number | null;
  cappedStatus: string | null;
  throttledStatus: string | null;
  isHero: boolean;
  heroTagline: string | null;
  heroImage: string | null;
  heroOption: HeroOption;
  url: string;
  newUrl: string;
  hasPreProduct: boolean;
  preProduct: IPreProduct;
  tagLine: string;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
}

interface iVisProps {
  hasCoverage: boolean;
  products: any[];
  providersStats: IProviderStatus[];
  campaigns: any[];
  providers: iProvAdd[];
  prices: iNumAdd[];
  ranges: iNumAdd[];
  type: 'fibre' | 'lte' | 'fip' | 'none';
}

const FIBRE_SPEED_RANGES: iNumAdd[] = [
  { key: '0-25', label: '0 - 25 Mbps', min: 0, max: 25, selected: false },
  { key: '25-50', label: '25 - 50 Mbps', min: 25, max: 50, selected: false },
  { key: '50-100', label: '50 - 100 Mbps', min: 50, max: 100, selected: false },
  { key: '100+', label: '100 Mbps+', min: 100, max: 10000, selected: false },
];

const FIBRE_PRICE_RANGES: iNumAdd[] = [
  { key: '0-699', label: 'R0 - R699', min: 0, max: 699, selected: false },
  { key: '700-999', label: 'R700 - R999', min: 700, max: 999, selected: false },
  { key: '1000+', label: 'R1000+', min: 1000, max: 100000, selected: false },
];

const LTE_DATA_RANGES: iNumAdd[] = [
  { key: '0-40', label: '0 - 40 GB', min: 0, max: 40, selected: false },
  { key: '41-100', label: '41 - 100 GB', min: 40, max: 100, selected: false },
  { key: '101-200', label: '101 - 200 GB', min: 100, max: 200, selected: false },
  { key: '201+', label: '201 GB+', min: 200, max: 100000, selected: false },
  { key: 'uncapped', label: 'Uncapped', min: 10000, max: 100000, selected: false },
];

const LTE_PRICE_RANGES: iNumAdd[] = [
  { key: '0-200', label: 'R0 - R200', min: 0, max: 200, selected: false },
  { key: '201-500', label: 'R201 - R500', min: 201, max: 500, selected: false },
  { key: '501-999', label: 'R501 - R999', min: 501, max: 999, selected: false },
  { key: '1000+', label: 'R1000+', min: 1000, max: 100000, selected: false },
];

const LTE_CAMPAIGN_CODES: iCampAdd[] = [
  {
    key: 'LTE-FREE-B315-ROUTER',
    label: 'Sim + Router purchase',
    selected: true,
  },
  { key: 'LTE-SIMONLY', label: 'Sim card only', selected: false },
];

function getVisibleProducts(props: iVisProps): any[] {
  const { providersStats, hasCoverage, products, campaigns, prices, providers, ranges, type } = props;

  if (!products || products.length == 0) {
    return products;
  }
  // we have products so continue
  else {
    // console.log('%c we got products let do the filtering now', 'color:lightseagreen', props);
    // 1. by type by default fip and none DO NOT show filters as from prev implementation

    if (type === 'fibre') {
      let filteredProducts: any[] = [];
      //1. first of all we filter for the campaign
      let use = products.filter((p) => p?.campaignCode === campaigns[0]?.code);

      // console.log('%c FIBRE', 'color:lightseagreen', type);
      // 2. By spesfic types this is where it gets diffuclt so going to do some chaining if possible
      // Most commonly selected first

      let isPrice = prices.filter((x) => x.selected).length;
      let isSpeed = ranges.filter((x) => x.selected).length;

      // price
      if (isPrice > 0 && isSpeed === 0) {
        // console.log('Filter is price only');
        use.forEach((u) => prices.forEach((p) => p.selected && u.productDisplayPrice >= p.min - 0.5 && u.productDisplayPrice <= p.max + 0.5 && filteredProducts.push(u)));
      }
      // speed
      else if (isSpeed > 0 && isPrice === 0) {
        // console.log('Filter is speed only');
        use.forEach((u) => ranges.forEach((r) => r.selected && u.downloadSpeedMbps >= r.min && u.downloadSpeedMbps < r.max && filteredProducts.push(u)));
      }
      // speed and price
      else if (isSpeed > 0 && isPrice > 0) {
        // console.log('Filter is speed and price');
        use.forEach((u) =>
          prices.forEach((p) =>
            ranges.forEach(
              (r) =>
                p.selected &&
                u.productDisplayPrice >= p.min - 0.5 &&
                u.productDisplayPrice <= p.max + 0.5 &&
                r.selected &&
                u.downloadSpeedMbps >= r.min &&
                u.downloadSpeedMbps < r.max &&
                filteredProducts.push(u)
            )
          )
        );
      }
      // none
      else {
        // console.log('Filter is none');
        filteredProducts = use;
      }

      // lastly provider selected
      let isProvider = providers.filter((x) => x.selected).length;
      let arr: any[] = [];
      if (isProvider) {
        // console.log('provider has been selected ');
        // console.log('F', f.coverageCode, 'P', p.coverageCode)
        filteredProducts.filter((f) => providers.filter((p) => p.selected && f.coverageCode === p.coverageCode && arr.push(f)));
      }

      // console.log('>>', filteredProducts);
      return sortByHero(hasCoverage, arr.length > 0 ? arr : filteredProducts);
    }
    // LTE
    else if (type === 'lte') {
      let filteredProducts: any[] = [];
      let arr: any[] = [];

      //1. first of all we filter for the campaign
      // p?.campaignCode === campaigns[0]?.key
      let use = products.filter((p) => campaigns.filter((c) => c.selected && p?.campaignCode === c?.key));

      // console.log('%c LTE', 'color:lightseagreen', use);

      // 2. By spesfic types this is where it gets diffuclt so going to do some chaining if possible
      let isPrice = prices.filter((x) => x.selected).length;
      let isSpeed = ranges.filter((x) => x.selected).length;

      // price
      if (isPrice > 0 && isSpeed === 0) {
        // console.log('Filter is price only');
        use.forEach((u) => prices.forEach((p) => p.selected && u.productDisplayPrice >= p.min - 0.5 && u.productDisplayPrice <= p.max + 0.5 && filteredProducts.push(u)));
      }
      // data ranges
      else if (isSpeed > 0 && isPrice === 0) {
        // console.log('Filter is speed only');

        let capp = use.filter((u) => u.standardCapGB !== null);
        let unCapp = use.filter((u) => u.standardCapGB === null);
        let selected = ranges.filter((r) => r.selected);

        // console.log('capp', capp, 'un capp', unCapp, 'se', selected);

        selected.forEach((r) => {
          if (r.key === 'uncapped') {
            filteredProducts = unCapp;
          } else {
            capp.forEach((p) => {
              let useSpeed = p.hasTeraByteValue ? p.standardCapGB * 1000 : p.standardCapGB;
              if (p.standardCapGB !== null && useSpeed >= r.min && useSpeed < r.max) {
                // console.log('looking for capped', useSpeed, prod.hasTeraByteValue, prod.cappedStatus, prod.standardCapGB, speed.label, speed.min, speed.max);
                filteredProducts.push(p);
              }
            });
          }
        });
      }
      // speed and price
      else if (isSpeed > 0 && isPrice > 0) {
        // console.log('Filter is speed and price');
        let capp = use.filter((u) => u.standardCapGB !== null);
        let unCapp = use.filter((u) => u.standardCapGB === null);
        let selected = ranges.filter((r) => r.selected);

        // console.log('capp', capp, 'un capp', unCapp, 'se', selected);

        prices.forEach((price) => {
          selected.forEach((r) => {
            if (r.key === 'uncapped') {
              unCapp.forEach((uc) => price.selected && uc.productDisplayPrice >= price.min - 0.5 && uc.productDisplayPrice <= price.max + 0.5 && filteredProducts.push(uc));
            } else {
              capp.forEach((p) => {
                let useSpeed = p.hasTeraByteValue ? p.standardCapGB * 1000 : p.standardCapGB;
                if (p.standardCapGB !== null && useSpeed >= r.min && useSpeed < r.max) {
                  if (price.selected && p.productDisplayPrice >= price.min - 0.5 && p.productDisplayPrice <= price.max + 0.5) {
                    // console.log('looking for capped', useSpeed, prod.hasTeraByteValue, prod.cappedStatus, prod.standardCapGB, speed.label, speed.min, speed.max);
                    filteredProducts.push(p);
                  }
                }
              });
            }
          });
        });
      }
      // none
      else {
        // console.log('Filter is none');
        filteredProducts = use;
      }

      // lastly provider selected
      let isProvider = providers.filter((x) => x.selected).length;

      if (isProvider) {
        // console.log('provider has been selected ');
        // console.log('F', f.providerCode, 'P', p.coverageCode)
        filteredProducts.filter((f) => providers.filter((p) => p.selected && f.providerCode === p.coverageCode && arr.push(f)));
      }

      // // lte only has campaign filter
      // let isCampaign = campaigns.filter((x) => x.selected).length;

      // if (isCampaign > 0) {
      //   console.log('campaign has been selected ');
      //   // console.log('f', f.campaignCode, 'c', c.key)
      //   //
      //   filteredProducts.filter((f) => campaigns.filter((c) => c.selected && f.campaignCode === c.key && arr.push(f)));
      // }

      return sortByHero(hasCoverage, arr.length > 0 ? arr : filteredProducts);
    }
    // FIP and NONE
    else {
      // console.log('%c NOTHING', 'color:lightseagreen');
      let final = products.filter((p) => p?.campaignCode === campaigns[0]?.code);
      return sortByHero(hasCoverage, final);
    }
  }
}

function generateArr(data1: any[], data2: any[]): any[] {
  let arr: any[] = [];

  let proc = data1?.filter((data1, i) => data1?.selected !== data2[i]?.selected);
  // console.log('%c proc', 'color:lightblue', proc, data1, data2);

  arr = [...proc, ...data2];

  return arr;
}

function sortByHero(hasRes: boolean, prods: IProduct[]) {
  let visibleProducts: IProduct[] = [];
  if (hasRes) {
    // filter arr1 by journey
    let heroProducts = prods.filter((p) => (p.isHero && p.heroOption === 'CoverageSearchedJourneyOnly') || (p.heroOption === 'AllUserJourneys' && p.heroTagline !== ''));
    //filter arr2 by hero tag
    let nonHeroProducts = prods.filter((p) => !heroProducts.includes(p));

    // console.log('>>', heroProducts, nonHeroProducts);
    // sort arr1 hero tagged cards by price lowest to highest
    heroProducts.sort((p1, p2) => {
      if (p1 && p1.productDisplayPrice && p2 && p2.productDisplayPrice) {
        return p1.productDisplayPrice - p2.productDisplayPrice;
      } else {
        return -1;
      }
    });

    // sort arr2 hero tagged cards by price lowest to highest
    nonHeroProducts.sort((p1, p2) => {
      if (p1 && p1.productDisplayPrice && p2 && p2.productDisplayPrice) {
        return p1.productDisplayPrice - p2.productDisplayPrice;
      } else {
        return -1;
      }
    });
    // update visibleProducts array
    visibleProducts = [...heroProducts, ...nonHeroProducts];
  } else {
    // filter arr1 by journey
    let heroProducts = visibleProducts.filter(
      (p) => (p.isHero && p.heroOption === 'IncognitoJourneyOnly' && p.heroTagline !== '') || (p.heroOption === 'AllUserJourneys' && p.heroTagline !== '')
    );
    let nonHeroProducts = visibleProducts.filter((p) => !heroProducts.includes(p));
    // sort arr1 hero tagged cards by price lowest to highest
    heroProducts.sort((p1, p2) => {
      if (p1 && p1.productDisplayPrice && p2 && p2.productDisplayPrice) {
        return p1.productDisplayPrice - p2.productDisplayPrice;
      } else {
        return -1;
      }
    });
    // sort arr2 hero tagged cards by price lowest to highest
    nonHeroProducts.sort((p1, p2) => {
      if (p1 && p1.productDisplayPrice && p2 && p2.productDisplayPrice) {
        return p1.productDisplayPrice - p2.productDisplayPrice;
      } else {
        return -1;
      }
    });
    // update visibleProducts array
    visibleProducts = [...heroProducts, ...nonHeroProducts];
  }

  return visibleProducts;
}

export default function ProductsComponent(props: iProps) {
  const {
    allProducts,
    allFibreCampaigns,
    page,
    fibre,
    lte,
    fip,
    hasResults,
    visibleProviders,
    showProductsCampainFilter,
    showProductFilters,
    productButtonText,
    overRideForProductClicked,
    useOverRideFunc,
  } = props;

  const [typeDisplay, setTypeDisplay] = useState<'fibre' | 'lte' | 'fip' | 'none'>('fibre');
  const [selectedSpeeds, setselectedSpeeds] = useState<iNumAdd[]>(typeDisplay === 'fibre' ? FIBRE_SPEED_RANGES : typeDisplay === 'lte' ? LTE_DATA_RANGES : []);
  const [selectedPrices, setselectedPrices] = useState<iNumAdd[]>(typeDisplay === 'fibre' ? FIBRE_PRICE_RANGES : typeDisplay === 'lte' ? LTE_PRICE_RANGES : []);
  const [selectedCampaigns, setselectedCampaigns] = useState<any[]>(allFibreCampaigns);
  const [selectedCampaignsLte, setselectedCampaignsLte] = useState<iCampAdd[]>(LTE_CAMPAIGN_CODES);
  const [selectedProviders, setselectedProviders] = useState<iProvAdd[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<any[]>([]);

  // Handles the visible providers info and sets the local state of the selected provider
  useEffect(() => {
    // console.log('%c 4.PRODUCTS COMPONENT > VP', 'color:lightgreen', visibleProviders);
    if (visibleProviders.details.length > 0) {
      setselectedProviders(visibleProviders.details);
    }
  }, [visibleProviders, hasResults]);

  // set to the correct type of display as well as setting up the base for the selected values { ie. every prop starting with selected* }
  useEffect(() => {
    let fPages = page === 'home' || page === 'fibre' || (page === 'campaign' && fibre) || (page === 'fibre-internet' && fibre) || page === 'mop-step2' ? true : false;
    let lPages = page === 'lte' || page === 'mop-step2' || (page === 'campaign' && !fibre) || (page === 'home' && !fibre) ? true : false;

    // console.log('%c 4.1.PRODUCTS COMPONENT > SETUP TYPEDISPLAY', 'color:lightgreen', page, fibre, fip, lte, '>>', fPages, lPages);

    if (fibre && fPages) {
      setTypeDisplay('fibre');
      setselectedCampaigns(allFibreCampaigns);
      setselectedSpeeds(FIBRE_SPEED_RANGES);
      setselectedPrices(FIBRE_PRICE_RANGES);
    }
    if (!fibre && fip && fPages) {
      setTypeDisplay('fip');
      setselectedCampaigns(allFibreCampaigns);
      // setselectedSpeeds([]);
      // setselectedPrices([]);
    }
    if (!fibre && !fip && lte && lPages) {
      setTypeDisplay('lte');
      setselectedSpeeds(LTE_DATA_RANGES);
      setselectedCampaignsLte(LTE_CAMPAIGN_CODES);
      setselectedPrices(LTE_PRICE_RANGES);
    }
    if (!fibre && !fip && !lte) {
      setTypeDisplay('none');
      setselectedCampaigns([]);
      setselectedSpeeds([]);
      setselectedPrices([]);
    }
  }, [page, fibre, fip, lte]);

  // check the type of display that is curently visble to client
  useEffect(() => {
    // console.log('%c 4.2.PRODUCTS COMPONENT > TYPEDISPLAY', 'color:lightgreen', typeDisplay, hasResults);
  }, [typeDisplay]);

  useEffect(() => {
    // console.log('%c 5.1.PRODUCTS COMPONENT > PRODUCTS FILTERED', 'color:lightgreen', filteredProducts, typeDisplay, hasResults);
  }, [filteredProducts]);

  // Handles products and which ones need to be displayed
  useEffect(() => {
    // console.log('%c 5.PRODUCTS COMPONENT > ALL PRODUCTS', 'color:lightgreen', allProducts);
    handleProductUpdate();
  }, [allProducts, typeDisplay, visibleProviders, selectedProviders, selectedPrices, selectedSpeeds, selectedCampaigns, selectedCampaignsLte]);

  function handleProductUpdate() {
    let props: iVisProps = {
      providersStats: visibleProviders.stats,
      hasCoverage: hasResults,
      products: allProducts,
      campaigns: typeDisplay !== 'lte' ? selectedCampaigns : selectedCampaignsLte,
      providers: selectedProviders,
      prices: selectedPrices,
      ranges: selectedSpeeds,
      type: typeDisplay,
    };
    let products = getVisibleProducts(props);
    setfilteredProducts(products);
  }

  return (
    <>
      {hasResults && (
        <>
          {typeDisplay === 'fibre' && (
            <>
              {
                  showProductFilters ? (
                      <FibreFilterProducts
                          hasCoverageSearch={hasResults}
                          availableCampaigns={allFibreCampaigns}
                          selectedCampaigns={selectedCampaigns}
                          selectedDataRangeSet={selectedSpeeds}
                          selectedPriceRangeSet={selectedPrices}
                          selectedProviders={selectedProviders}
                          updateDealType={(e: ICampaign[]) => setselectedCampaigns(generateArr(e, selectedCampaigns))}
                          updateVisibleDataRange={(e: iNumAdd[]) => setselectedSpeeds(generateArr(e, selectedSpeeds))}
                          updateVisiblePriceRange={(e: iNumAdd[]) => setselectedPrices(generateArr(e, selectedPrices))}
                          updateVisibleProvider={(e: iProvAdd[]) => setselectedProviders(generateArr(e, selectedProviders))}
                          showProductsCampainFilter={showProductsCampainFilter}
                      />
                  ) : (
                      <h3 className="text-center font-bold text-2xl">Choose a Fibre package</h3>
                  )
              }

              <div className='w-full flex flex-col justify-center items-center'>
                <FibreProductGrid
                  buttonText='View more'
                  fibreServices={selectedProviders}
                  providersStats={visibleProviders.stats}
                  hasCoverageSearchResults={hasResults}
                  intLoadMore={10}
                  onLinkWrapperClick={() => {}}
                  products={filteredProducts}
                  page={page}
                  typeDisplay={typeDisplay}
                  productButtonText={productButtonText}
                  overRideForProductClicked={overRideForProductClicked}
                  useOverRideFunc={useOverRideFunc}
                />
              </div>
            </>
          )}

          {typeDisplay === 'fip' && (
            <>
              <div className='w-full flex flex-col justify-center items-center'>
                <FibreProductGrid
                  buttonText='View more'
                  fibreServices={selectedProviders}
                  providersStats={visibleProviders.stats}
                  hasCoverageSearchResults={hasResults}
                  intLoadMore={10}
                  onLinkWrapperClick={() => {}}
                  products={filteredProducts}
                  page={page}
                  typeDisplay={typeDisplay}
                  productButtonText={productButtonText}
                  overRideForProductClicked={overRideForProductClicked}
                  useOverRideFunc={useOverRideFunc}
                />
              </div>
            </>
          )}

          {typeDisplay === 'lte' && (
            <>
              {
                  showProductFilters ? (
                      <LteFilterProductCards
                          availableCampaigns={LTE_CAMPAIGN_CODES}
                          hasCoverageSearch={hasResults}
                          selectedCampaigns={selectedCampaignsLte}
                          selectedDataRangeSet={selectedSpeeds}
                          selectedPriceRangeSet={selectedPrices}
                          selectedProviders={selectedProviders}
                          updateDealType={(e: iCampAdd[]) => setselectedCampaignsLte(generateArr(e, selectedCampaignsLte))}
                          updateVisibleDataRange={(e: iNumAdd[]) => setselectedSpeeds(generateArr(e, selectedSpeeds))}
                          updateVisiblePriceRange={(e: iNumAdd[]) => setselectedPrices(generateArr(e, selectedPrices))}
                          updateVisibleProvider={(e: iProvAdd[]) => setselectedProviders(generateArr(e, selectedProviders))}
                      />
                    ) : (
                          <h3 className="text-center font-bold text-2xl">Choose a LTE package</h3>
                        )
              }

              <div className='w-full flex flex-col justify-center items-center'>
                {/* {page === 'home' && ( */}
                <LteProductsGrid
                  buttonText='View more'
                  hasCoverageSearchResults={hasResults}
                  intLoadMore={10}
                  onLinkWrapperClick={() => {}}
                  page={page}
                  products={filteredProducts}
                  providers={selectedProviders}
                  providersStats={visibleProviders.stats}
                  typeDisplay={typeDisplay}
                  productButtonText={productButtonText}
                  overRideForProductClicked={overRideForProductClicked}
                  useOverRideFunc={useOverRideFunc}
                />
                {/* )} */}
              </div>
            </>
          )}

          {(typeDisplay === 'none' || allProducts.length === 0) && (
            <div className='text center m-2 font-bold text-xl'>Please ensure you have selected a valid location. No providers found for the area you selected. </div>
          )}
        </>
      )}
    </>
  );
}
