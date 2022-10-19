/* 
  Handles recieving the services and then updating all the relevent info 
  processes the products related to the services recieved and will return the corroct products to use based on services recieved 
  Holds the getNotefied compoenent when a service is still in the process of being rolled out  
*/

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { parseProviderLocation } from '../helpers/Location';
import { isLive, isPlanned } from '../helpers/Services';
import { IProviderLocation, IProviderStatus } from '../interfaces/Coverage';
import { IServiceEntry, ServiceType } from '../interfaces/Services';
import { IFibreProduct } from '../services/fibreProductService';
import { ILteProduct } from '../services/lteProductService';
import { setLocalStorageItem } from '../services/storageService';
import { IUserData, UserDataSearchAddressAvailability, UserDataService } from '../services/userDataService';
import CoverageCelebrationBoxes from '../celebrationBoxes/CoverageCelebrationBoxes';
import LoadingSpinner from 'components/LoadingSpinner';

interface iProps {
  services: IServiceEntry[];
  page: string;
  isLoading: boolean;
  fibreProducts: IFibreProduct[];
  lteProducts: ILteProduct[];
  showCelebrationBoxes: boolean;
  handleProducts: (products: any) => void;
  handlefibre: (val: boolean) => void;
  handlefip: (val: boolean) => void;
  handlelte: (val: boolean) => void;
  handleProviders: (arr: IProviderStatus[]) => void;
}

// FILTER TO SORT RELEVENT PROVIDERS from services recieved
function processServices(services: IServiceEntry[]) {
  let fibreProviders: IProviderStatus[] = [];
  let lteProviders: IProviderStatus[] = [];
  let adslProviders: IProviderStatus[] = [];
  let pureDSLProviders: IProviderStatus[] = [];

  for (const service of services) {
    let serviceType = service?.type;
    let providers = service?.providers;

    // console.log('TYPE', serviceType, 'PROV', providers);

    // Check if the providers is an array before iterating through
    if (!Array.isArray(providers)) {
      console.warn(`providers = ${providers} associated service type = ${serviceType} is not an array, skipping`);
      continue;
    }

    // Providers are an array we can continue trough the process
    for (const provider of providers) {
      let code = provider?.provider;
      let status = provider?.status;
      let locations: IProviderLocation[] = [];

      if (Array.isArray(provider?.location_result)) {
        for (const item of provider.location_result) {
          let location = parseProviderLocation(item);
          if (location) {
            locations.push(location);
          }
        }
      }

      switch (serviceType) {
        case ServiceType.FIBRE:
          fibreProviders.push({ code, status, locations });
          break;

        case ServiceType.LTE:
          lteProviders.push({ code, status, locations });
          break;

        case ServiceType.ADSL:
          adslProviders.push({ code, status, locations });
          break;

        case ServiceType.PUREDSL:
          pureDSLProviders.push({ code, status, locations });
          break;
      }
    }
  }

  return { fibreProviders, lteProviders, adslProviders, pureDSLProviders };
}

// FILTER TO FIND RELEVENT PRODUCTS to the type of provider required
function filterProducts(type: 'lte' | 'fibre', status: string = 'live', services: any[], fibreProducts: any[], lteProducts: any[]) {
  let productsFromServices: any = [];
  let providerTypes: any[] = services ? services.filter((p) => p.type.toLowerCase() === type.toLowerCase()) : [];

  if (type === 'fibre') {
    // console.log('fibre prov', providerTypes);
    providerTypes.forEach((p) => {
      // console.log('P', p);
      p.providers.forEach((entry: { provider: string; status: string }) => {
        if (entry.status === status) {
          let avail = fibreProducts.filter((prod: any) => entry.provider === prod.coverageCode);
          productsFromServices = [...productsFromServices, ...avail];
        }
      });
    });
  }

  if (type === 'lte') {
    // console.log('lte prov', providerTypes);
    providerTypes.forEach((p) => {
      p.providers.forEach((entry: { provider: string; status: string }) => {
        if (entry.status === status) {
          // console.log('entry', entry);
          let avail = lteProducts.filter((prod: any) => entry.provider === prod.providerCode);
          productsFromServices = [...productsFromServices, ...avail];
        }
      });
    });
  }
  // console.log('Products from Services: ', productsFromServices);
  return productsFromServices;
}

export default function ServicesComponent(props: iProps) {
  const { services, page, isLoading, fibreProducts, lteProducts, handleProducts, handlefibre, handlelte, handleProviders, handlefip, showCelebrationBoxes } = props;

  const router = useRouter();

  /* ------------ TYPES OF PROVIDERS FROM SERVICES ---------- */
  const [lte, setLte] = useState(false);
  const [fibre, setFibre] = useState(false);
  const [dsl, setDsl] = useState(false);
  const [fibreInProgress, setFibreInProgress] = useState(false);

  /* -------------- OTHER STATES NEEDED ------------------- */
  const [showFibre, setshowFibre] = useState(false);
  const [getNotified, setGetNotified] = useState(false);
  const [notifyService, setNotifyService] = useState('');

  // handles wherther or not to show the fibre boxes based on a feature switch
  useEffect(() => {
    let e = process.env.NEXT_PUBLIC_ENABLE_FIBRE_LTE_CELEBRATION_BOXES;
    let envVar: string = e !== undefined ? e : '';

    if (envVar === 'true') {
      setshowFibre(true);
    }
  }, []);

  /* 
    HANDLES ALL INCOMING SERVICES FROM A SEARCH 
    THIS WILL DEAL WITH WHAT TO DISPLAY IN THE NEXT STEP 
    IE VISUALLY DISPLAYING PRODUCTS THAT BELONG TO THIS SERVICE
  */
  useEffect(() => {
    // console.log('%c 1.SERVICES > PROVIDERS', 'color: lightgreen', services);
    if (services && services.length > 0 && !isLoading) {
      /* --------------------- TYPES OF SERVICES START-------------------- */

      let allProviders = processServices(services);
      // console.log('%c 1.1.SERVICES > ALLPROVIDERS', 'color: lightgreen', allProviders);

      /* ---- FIBRE ---- */
      let fibreProviders = allProviders.fibreProviders;
      let hasFibre: boolean = fibreProviders.some((s) => isLive(s.status !== null ? s.status : ''));
      let fip: boolean = fibreProviders.some((s) => isPlanned(s.status !== null ? s.status : ''));

      /* ---- LTE ---- */
      let lteProviders = allProviders.lteProviders;
      let hasLte = lteProviders.some((s) => isLive(s.status !== null ? s.status : ''));

      /* ---- ADSL ---- */
      let adslProviders = allProviders.adslProviders;
      let hasAdsl = adslProviders.some((s) => isLive(s.status !== null ? s.status : ''));

      /* ---- PURE ADSL ---- */
      let pureProviders = allProviders.pureDSLProviders;
      let hasPure = pureProviders.some((s) => isLive(s.status !== null ? s.status : ''));

      // console.log('%c 1.2.PROVIDERS TYPES', 'color: lightgreen', 'fibre>', hasFibre, 'fibre in progress>', fip, 'lte>', hasLte, 'adsl>', hasAdsl, 'pure>', hasPure);

      setFibre(hasFibre);
      setFibreInProgress(fip);
      setLte(hasLte);
      setDsl(hasPure);

      handlefip(fip);
      handlefibre(hasFibre);
      handlelte(hasLte);

      /* --------------------- TYPES OF SERVICES END -------------------- */

      /* --------------------- PRODUCTS START-------------------- */
      // console.log('%c 2.SERVICES > PRODUCTS', 'color: lightgreen', fibreProducts, lteProducts);

      let productsFibreLive = filterProducts('fibre', 'live', services, fibreProducts, lteProducts);
      let productsFIP1 = filterProducts('fibre', 'in progress', services, fibreProducts, lteProducts);
      let productsFIP2 = filterProducts('fibre', 'inprogress', services, fibreProducts, lteProducts);
      let productsLTE = filterProducts('lte', 'live', services, fibreProducts, lteProducts);

      // console.log('%c 2.1 PRODUCTS SORTED', 'color: lightgreen', 'FL', productsFibreLive, 'FIP1', productsFIP1, 'FIP2', productsFIP2, 'LTE', productsLTE);

      if (hasFibre) {
        let use = productsFIP1.length > 0 ? productsFIP1 : productsFIP2.length > 0 ? productsFIP2 : [];
        let final = use.length > 0 ? [...productsFibreLive, ...use] : productsFibreLive;
        // console.log('%c 2.2 FIBRE', 'color:lightgreen', final);
        handleProviders(fibreProviders);
        handleProducts(final);
      }
      if (!hasFibre && fip) {
        let use = productsFIP1.length > 0 ? productsFIP1 : productsFIP2.length > 0 ? productsFIP2 : [];
        // console.log('%c 2.2 FIBRE IN PROGRESS', 'color:lightgreen', use);
        handleProviders(fibreProviders);
        handleProducts(use);
      }
      if (!hasFibre && !fip && hasLte) {
        // console.log('%c 2.2 LTE', 'color:lightgreen', productsLTE);
        handleProducts(productsLTE);
        handleProviders(lteProviders);
      }
      if (hasAdsl) {
        // console.log('%c 2.2 ADSL', 'color:lightgreen');
      }
      if (hasPure) {
        // console.log('%c 2.2 PURE', 'color:lightgreen');
      }

      /* --------------------- PRODUCTS END -------------------- */

      /* ---------------------LOCAL STORAGE START -------------------- */

      // need to add the update to userdata services needed
      let userData: IUserData = UserDataService.initialiseUserData();
      userData.addressSearch.fibreAvailability = hasFibre
        ? UserDataSearchAddressAvailability.Available
        : fip
        ? UserDataSearchAddressAvailability.ComingSoon
        : UserDataSearchAddressAvailability.NotAvailable;
      userData.addressSearch.lteAvailability = hasLte ? UserDataSearchAddressAvailability.Available : UserDataSearchAddressAvailability.NotAvailable;
      userData.addressSearch.pureDslAvailability = hasAdsl ? UserDataSearchAddressAvailability.Available : UserDataSearchAddressAvailability.NotAvailable;
      setLocalStorageItem('userData', userData);

      /* ---------------------LOCAL STORAGE END -------------------- */
    } else {
      setFibre(false);
      setLte(false);
      setDsl(false);
      setFibreInProgress(false);
      handlefibre(false);
      handlelte(false);
      handlefip(false);
    }
  }, [services, isLoading, fibreProducts, lteProducts]);

  // If not LTE but there is Fibre available, then re-direct to /fibre
  useEffect(() => {
    if (router.pathname === '/lte') {
      if (!lte && fibre) router.push('/fibre');
      // Set scrollToId for map coverage update
      // setScollToId(`${process.env.NEXT_PUBLIC_LTE_DOCK_ANCHOR}`);
    }
    if (router.pathname === '/fibre') {
      if (!fibre && !fibreInProgress && lte) router.push('/lte');
      // Set scrollToId for map coverage update
      // setScollToId(`${process.env.NEXT_PUBLIC_FIBRE_DOCK_ANCHOR}`);
    }
  }, [fibre, lte, dsl, fibreInProgress]);

  // notifcation function
  function handleNotified(type: string, scrollPoint: string) {
    setNotifyService(type);
    setGetNotified(true);
    scrollTo(scrollPoint);
  }

  // pre order redirect to fibre page
  function preOrderFibre() {
    router.push('/fibre');
  }

  // scroll to set point of intrest
  function scrollTo(id: string) {
    setTimeout(() => {
      let doc = document.getElementById(id);
      if (doc !== null) {
        doc.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 500);
  }

  return (
    <>
      {isLoading && (
        <div className='w-full flex items-center justify-center mt-10 mb-12 py-10'>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && services && showCelebrationBoxes && (
        <>
          {showFibre && page !== 'mop-step2' && (
            <CoverageCelebrationBoxes
              fibre={fibre}
              lte={lte}
              dsl={dsl}
              fibreInProgress={fibreInProgress}
              toggleFibre={() => handleNotified('Fibre', 'getNotified')}
              toggleLte={() => handleNotified('LTE', 'getNotified')}
              preOrderFibre={() => preOrderFibre}
              fromPage={page}
            />
          )}

          {/* {page === 'mop-step2' && (
            <MOPCoverageCelebrationBoxes
              fibre={fibre}
              lte={lte}
              dsl={dsl}
              fibreInProgress={fibreInProgress}
              toggleFibre={()=> handleNotified("Fibre", "getNotified")}
              toggleLte={()=> handleNotified("LTE", "getNotified")}
              preOrderFibre={preOrderFibre}
              fromPage={page}
              toggleServiceFilter={toggleServiceFilter}
            />
          )} */}
        </>
      )}
    </>
  );
}
