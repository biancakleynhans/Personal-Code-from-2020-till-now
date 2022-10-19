/*
  CONTAINER FUNCTION FOR THE NEW COVERAGE COMPONENT WILL RECIEVE ALL THE NESSECARY INFO FROM THE 
  PAGE CALLING IT THEN PROCESS THAT INFO AND PASS IT DOWN TO ITS CHILDREN AND HANDLE 
  ALL COVERAGE RELATED LOGIC
*/

import { useEffect, useState } from 'react';
import CoverageInput from './coverage/CoverageInputComponent';
import ProductsComponent from './coverage/ProductsCompomnent';
import ServicesComponent from './coverage/ServicesComponent';
import { IProviderStatus } from './interfaces/Coverage';
import { IServiceEntry } from './interfaces/Services';
import { getProductsForPromoCampaign, ICampaign } from './services/campaignsService';
import { IFibreProduct } from './services/fibreProductService';
import { ILteProduct } from './services/lteProductService';
import { IFibreProvider, ILteProvider } from './services/providerService';
import { iProvAdd } from './filters/FibreProviderBannerSelectorMobile';
import LoadingSpinner from 'components/LoadingSpinner';

interface iProps {
  page: string;

  // DEFAULT
  fibreProducts: IFibreProduct[];
  fibreCampaigns: ICampaign[];
  fibreProviders: IFibreProvider[];
  lteProducts: ILteProduct[];
  lteProviders: ILteProvider[];

  // INPUT
  InputLabelText: string;
  InputPlaceholderText: string;
  InputTermsAndConditionsText: string;
  InputUseDefaults: boolean;

  // SERVICES && PRODUCTS
  hideInputOnResults: boolean;
  showProductsCampainFilter: boolean;
  showCelebrationBoxes: boolean;
  showProductFilters: boolean;
  productButtonText: string;

  // SPESIFICALLY LOOKING TO FIND
  useAssignedCampaign: boolean;
  useAssignedProvider: boolean;
  assignedCampaign: string;
  typeOfCampaign: 'lte' | 'fibre';
  assignedProvider: string;
  handleNotFound: () => void;
  handleFound: () => void;
  overRideForProductClicked: () => void;
  useOverRideFunc: boolean;

  privateCampaigns: ICampaign[];
}

export default function CoverageComponent(props: iProps) {
  const {
    privateCampaigns,
    fibreCampaigns,
    fibreProducts,
    fibreProviders,
    lteProducts,
    lteProviders,
    page,
    InputLabelText,
    InputPlaceholderText,
    InputTermsAndConditionsText,
    InputUseDefaults,
    hideInputOnResults,
    showProductsCampainFilter,
    showCelebrationBoxes,
    showProductFilters,
    productButtonText,
    assignedCampaign,
    typeOfCampaign,
    assignedProvider,
    useAssignedCampaign,
    useAssignedProvider,
    useOverRideFunc,
    handleNotFound,
    handleFound,
    overRideForProductClicked,
  } = props;

  /* Coverage Input Controls */
  const [showBannerContent, setshowBannerContent] = useState<boolean>(true);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);
  const [servicesFrom28East, setservicesFrom28East] = useState<IServiceEntry[]>([]);
  const [inputString, setinputString] = useState<string>('');

  /* Services Controls */
  const [providers, setProviders] = useState<IProviderStatus[]>([]);
  const [providersObj, setProvidersObj] = useState<{ details: iProvAdd[]; stats: IProviderStatus[] }>({ details: [], stats: [] });
  const [productsFromService, setproductsFromService] = useState([]);
  // const [productsFromAssigned, setproductsFromAssigned] = useState([]);
  const [lte, setLte] = useState(false);
  const [fibre, setFibre] = useState(false);
  const [fip, setfip] = useState(false);

  /* used by all */
  const [hasResults, sethasResults] = useState<boolean>(false);

  // Display
  const [hideNow, sethideNow] = useState(false);

  useEffect(() => {}, [InputLabelText, InputPlaceholderText, InputTermsAndConditionsText, InputUseDefaults, hideInputOnResults, showProductsCampainFilter, useOverRideFunc]);
  useEffect(() => {}, [fibreCampaigns, fibreProducts, lteProducts, page]);
  useEffect(() => {}, [fibre, fip, lte, productsFromService]);
  useEffect(() => {}, [showBannerContent]);
  useEffect(() => {}, [providersObj]);
  useEffect(() => {}, [hasResults]);
  useEffect(() => {}, [hideNow]);

  // whether the search is still begin done so checking if we still searching for an adress
  useEffect(() => {
    // console.log('loading serv', loadingServices);
    if (!loadingServices && servicesFrom28East.length === 0) {
      sethasResults(false);
    } else if (!loadingServices && servicesFrom28East.length > 0) {
      sethasResults(true);
    }
  }, [loadingServices]);

  // this function resets all the container values if we changed adress this is all it has to do nothing else
  useEffect(() => {
    // console.log('%c 0.0.S28 > SERVICES', 'color:lightgreen', servicesFrom28East, inputString);
    // this function resets all the container values if we changed adress
    if (servicesFrom28East.length === 0 && inputString.length === 0) {
      setLoadingServices(false);
      setProviders([]);
      setProvidersObj({ details: [], stats: [] });
      setproductsFromService([]);
      setFibre(false);
      setLte(false);
      setshowBannerContent(true);
      sethasResults(false);
    }

    if (!loadingServices && servicesFrom28East.length > 0) {
      setLoadingServices(false);
      sethasResults(true);
      setshowBannerContent(false);
    }
  }, [servicesFrom28East]);

  // handles providers and creates the provider object which will be sent to the products section it holds both versions of providers
  useEffect(() => {
    // console.log('%c 3.PROVIDERS & PRODUCTS @ MAIN', 'color:lightgreen', providers, productsFromService);
    if (providers.length > 0) {
      let details: any[] = [];
      providers.forEach((prov) => {
        // console.log('%c 3.1 PROVIDER OBJ CREATOR', 'color:lightgreen', prov);

        if (!useAssignedCampaign) {
          if (fibre) {
            details = [...details, ...createProviderObjArr(fibreProviders, prov.code, 'fibre')];
          }

          if (!fibre && fip) {
            details = [...details, ...createProviderObjArr(fibreProviders, prov.code, 'fip')];
          }

          if (!fibre && !fip && lte) {
            details = [...details, ...createProviderObjArr(lteProviders, prov.code, 'lte')];
          }
        }
      });

      // console.log('%c 3.3 OBJ COMPLETE', 'color:lightgreen', { details: details, stats: providers });
      setProvidersObj({ details: details, stats: providers });

      if (hideInputOnResults) {
        sethideNow(true);
      }

      // // spesific provider
      // if (useAssignedProvider) {
      //   runAssignedProvider()
      // }
      // // spesific campaign
      // else if (useAssignedCampaign && !useAssignedProvider) {
      //   console.log('%c 3.4 ASSIGNED CAMPAIGN', 'color:lightgreen', useAssignedProvider, assignedProvider);
      // }
      // // spesific campaign &&provider
      // else if (useAssignedCampaign && useAssignedProvider) {
      //   console.log('%c 3.4 ASSIGNED PROVIDER && CAMPAIGN', 'color:lightgreen', useAssignedProvider, assignedProvider);
      // }

      // // defaults no spefic provider or campaign needed
      // else {

      // }
    }
  }, [providers, fibreProviders, lteProviders, useAssignedCampaign]);

  // handles the logic if spefic provider is wanted
  useEffect(() => {
    if (useAssignedCampaign && !useAssignedCampaign && providersObj.stats.length > 0 && providersObj.details.length > 0) {
      runAssignedProvider();
    }
  }, [useAssignedProvider, assignedProvider, providersObj]);

  // handles the logic if specific campaign is required
  useEffect(() => {
    if (useAssignedCampaign) {
      runAssignedCampaign();
    }
  }, [useAssignedCampaign, assignedCampaign, typeOfCampaign, privateCampaigns, providersObj, fibreProducts, lteProducts]);

  function createProviderObjArr(providerArr: any[], providerCoder: string, type: string): any[] {
    let details: any[] = [];

    details = [...details, ...providerArr.map((f) => transformToObj(f)).filter((x) => x.coverageCode === providerCoder)];
    // console.log(`%c 3.2 BUILD ${type.toUpperCase()}`, 'color:lightgreen', details);

    return details;
  }

  function transformToObj(oldObject: any): iProvAdd {
    let newObject: iProvAdd = {
      active: oldObject.active,
      code: oldObject.code,
      coverageCode: oldObject.coverageCode,
      logoUrl: oldObject.logoUrl,
      name: oldObject.name,
      productSubcat: oldObject.productSubcat,
      productUrlSlug: oldObject.productUrlSlug,
      selected: true,
    };

    return newObject;
  }

  function runAssignedProvider() {
    console.log('%c 3.4 ASSIGNED PROVIDER', 'color:lightgreen', useAssignedProvider, assignedProvider);
    let final = { details: [], stats: [] };
    //1. overwrite default flow as switch only wants fibre
    setLte(false);
    setfip(false);
    setFibre(true);
    // 2. get that provider and build the prover object
    let stat = providers.filter((x) => x.code === assignedProvider);
    let detail = fibreProviders
      .map((f) => ({
        active: f.active,
        code: f.code,
        coverageCode: f.coverageCode,
        logoUrl: f.logoUrl,
        name: f.name,
        productSubcat: f.productSubcat,
        productUrlSlug: f.productUrlSlug,
        selected: true,
      }))
      // console.log('X', x.coverageCode, x.code, assignedProvider)
      .filter((x) => x.coverageCode === assignedProvider);

    final.details = [...detail];
    final.stats = [...stat];

    console.log('>>>>', final);

    if (final.details.length > 0 && final.stats.length > 0) {
      setProvidersObj(final);
      handleFound();
      if (hideInputOnResults) {
        sethideNow(true);
      }
    } else {
      setProvidersObj(final);
      handleNotFound();
    }
  }

  function runAssignedCampaign() {
    // console.log('%c 3.4 ASSIGNED CAMPAIGN', 'color:lightgreen', useAssignedCampaign, assignedCampaign, typeOfCampaign, privateCampaigns, providersObj);

    //   let use: any[] = [];
    // let arr = privateCampaigns.filter((x) => x.code === assignedCampaign);
    // console.log('%c >>>>>>>>>>', 'color:red', arr);

    // if (arr.length > 0) {
    //   let newProducts = [];
    //   arr.forEach((camp) => {
    //     console.log('%c <<<<<>>>>>', 'color:red', camp.promocodes);
    //     getProductsForPromoCampaign(camp)
    //       .then((res) => {
    //         console.log('RES >>>', res);
    //         newProducts = [...newProducts, ...res];
    //         console.log('%c <<<<< FINAL >>>>>', 'color:red', newProducts, providersObj);
    //
    //         setproductsFromService(newProducts);
    //       })
    //       .catch((err) => console.log('ERROR', err));
    //   });
    //
    //
    // }

    const allProducts = [...fibreProducts, ...lteProducts];
    const filteredProducts = allProducts.filter((p) => p.campaignCode === assignedCampaign);
    setproductsFromService(filteredProducts);

    // console.log("======== productsFromService ========");
    // console.log(productsFromService);

    if (typeOfCampaign === 'lte') {
      setLte(true);
      setfip(false);
      setFibre(false);
    } else {
      setLte(false);
      setfip(false);
      setFibre(true);
    }
  }

  return (
    <>
      <a id='coverage-search-bar'></a>
      {!hideNow && (
        <CoverageInput
          page={page}
          showBanner={showBannerContent}
          handleBanner={(val) => setshowBannerContent(val)}
          handleLoadingServices={(val) => setLoadingServices(val)}
          handleServicesFrom28East={(val) => setservicesFrom28East(val)}
          handleInputString={(e: string) => setinputString(e)}
          labelText={InputLabelText}
          placeholderText={InputPlaceholderText}
          termsAndConditionsText={InputTermsAndConditionsText}
          useDefaults={InputUseDefaults}
          showAdressChangeAndMap={showProductsCampainFilter}
        />
      )}

      {!hasResults && productsFromService.length === 0 && providersObj.stats.length === 0 && inputString.length > 0 && (
        <div className='w-full h-10  my-4 flex flex-row justify-center content-center items-center'>
          <LoadingSpinner />
        </div>
      )}

      {hasResults && (
        <ServicesComponent
          services={servicesFrom28East}
          isLoading={loadingServices}
          page={page}
          fibreProducts={fibreProducts}
          lteProducts={lteProducts}
          handleProducts={(prods) => setproductsFromService(prods)}
          handlefibre={(val: boolean) => setFibre(val)}
          handlefip={(val: boolean) => setfip(val)}
          handlelte={(val: boolean) => setLte(val)}
          handleProviders={(arr: IProviderStatus[]) => setProviders(arr)}
          showCelebrationBoxes={showCelebrationBoxes}
        />
      )}

      {hasResults && productsFromService.length > 0 && providersObj.stats.length > 0 && (
        <ProductsComponent
          useOverRideFunc={useOverRideFunc}
          overRideForProductClicked={overRideForProductClicked}
          allProducts={productsFromService}
          allFibreCampaigns={fibreCampaigns}
          page={page}
          fip={fip}
          fibre={fibre}
          lte={lte}
          hasResults={hasResults}
          visibleProviders={providersObj}
          showProductsCampainFilter={showProductsCampainFilter}
          showProductFilters={showProductFilters}
          productButtonText={productButtonText}
        />
      )}
    </>
  );
}
