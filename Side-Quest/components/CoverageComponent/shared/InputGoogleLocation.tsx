/*
    Coverage input Handles the user input to select a location 
    This has an input bar as well a a map elelement both return the correct services 
*/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MwebButton from './MwebButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import styles from '../styles/Coverage.module.css';
import ViewMapButton from './ViewMapButton';
import useEventListener from '../hooks/useEventListener';
import { IServiceEntry } from '../interfaces/Services';
import { fetchFromClient } from '../utils/fetching';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../services/storageService';
import { IUserData, UserDataService } from '../services/userDataService';

interface iProps {
  placeholderText: string;
  labelText: string;
  underlabelText: string;

  handleResetBanner: (value: boolean) => void;
  showBannerContent: boolean;

  handleServicesUpdate: (services: IServiceEntry[]) => void;
  handleInputString: (e: string) => void;

  page: string;
  handleLoading: (value: boolean) => void;
  showMap: boolean;
  handleResetMap: (value: boolean) => void;
  showAdressChangeAndMap: boolean;
}

/*GET THE SERVICES VIA FETCH CALL FOR WHEN USER ENTERS ADRESS IN SEARCH BAR*/
async function getServices(latitude: number, longitude: number): Promise<IServiceEntry[]> {
  const url = `${process.env.NEXT_PUBLIC_COVERAGE_URL}${latitude}/${longitude}`;
  const response = await fetchFromClient(url);
  const data = await response.json();
  let retryCount = 3;

  let services: IServiceEntry[] = [];

  for (let i = 0; i < retryCount; i++) {
    if (response.ok) {
      // console.log('%c  SERVICES >> storedCoverageData', 'color:pink ', data);
      setLocalStorageItem('storedCoverageData', data);
      services = data.services;
      break;
    } else {
      console.log('%c error happend ', 'color:red');
    }
  }
  return Promise.resolve(services);
}

// Local storage set the searched adress
function setUserDataSearchAddress(place: any) {
  // console.log('%c  SERVICES >> set userData', 'color:pink ', place);
  let userData: IUserData = UserDataService.initialiseUserData();

  let lat = place.geometry.location.lat;
  let long = place.geometry.location.lng;

  userData.addressSearchMade = true;
  userData.addressSearch.locationTypes = place.types ? place.types : [];
  userData.addressSearch.placeId = place.place_id ? place.place_id : '';
  userData.addressSearch.formattedAddress = place.formatted_address ? place.formatted_address : '';

  userData.addressSearch.latitude = lat;
  userData.addressSearch.longitude = long;

  if (place.address_components && place.address_components?.length > 0) {
    for (let i = 0; i < place.address_components?.length; i++) {
      const types = place.address_components[i].types;
      if (types && types.length > 0) {
        for (let t = 0; t < types.length; t++) {
          if (types[t] === 'street_number') {
            userData.addressSearch.streetNumber = place.address_components[i].long_name;
          }
          if (types[t] === 'route') {
            userData.addressSearch.street = place.address_components[i].long_name;
          }
          if (types[t] === 'sublocality') {
            userData.addressSearch.suburb = place.address_components[i].long_name;
          }
          if (types[t] === 'locality') {
            userData.addressSearch.town = place.address_components[i].long_name;
          }
          if (types[t] === 'administrative_area_level_1') {
            userData.addressSearch.province = place.address_components[i].long_name;
          }
          if (types[t] === 'postal_code') {
            userData.addressSearch.postalCode = place.address_components[i].long_name;
          }
        }
      }
    }
  }
  // console.log('%c  USERDATA', 'color:pink ', userData);
  setLocalStorageItem('userData', userData);
}

const mapStringFibre: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&fibre=true&hidecoveragelayers=false&hidesearch=true&`;
const mapStringLte: string = `//${process.env.NEXT_PUBLIC_28EAST_MAP_URL}?geolocate=false&lte=true&hidecoveragelayers=false&hidesearch=true&`;

export default function InputGoogleLocation(props: iProps) {
  const {
    handleResetBanner,
    handleServicesUpdate,
    handleResetMap,
    handleLoading,
    handleInputString,
    labelText,
    underlabelText,
    placeholderText,
    showBannerContent,
    showAdressChangeAndMap,
    page,
    showMap,
  } = props;

  const autoCompleteRef = useRef(null);

  const [nextWindow, setNextWindow] = useState<Window | null>(null);
  const [hasServices, sethasServices] = useState<boolean>(false);

  const [location, setLocation] = useState<any>('');
  const [addressSelected, setaddressSelected] = useState<boolean>(false);
  const [jsonSearchData, setJsonSearchData] = useState<any>(null);
  const [mapSrc, setMapSrc] = useState(`${mapStringFibre}location=0,0`);

  //   Startup setup form page lte and window
  // load from local storage
  useEffect(() => {
    // BUG fix for "window is not defined" in Next.js
    if (typeof window !== 'undefined') {
      setNextWindow(window);
    }

    // set coverage area for Fibre (default) or LTE on map view
    if (page === 'lte') {
      // setFromPage('lte');
      setMapSrc(`${mapStringLte}location=0,0`);
    }

    handleAutoCompleteChanges(autoCompleteRef);

    // THIS IS THE POINT WHERE WE WILL FIRST CHECK FOR LOCAL STORAGE IS SET FOR USER DATA
    let localStorage = getLocalStorageItem('userData');
    // console.log('%c LS', 'color:blue', localStorage);
    if (localStorage !== null) {
      let ls: IUserData = localStorage as IUserData;
      // console.log('%c LS', 'color:lightblue', ls.addressSearch.latitude, ls.addressSearch.longitude);
      if (ls.addressSearchMade && ls.addressSearch.longitude && ls.addressSearch.latitude) {
        setLocation(ls.addressSearch.formattedAddress);
        setMapSrc(`${mapStringFibre}location=${ls.addressSearch.latitude},${ls.addressSearch.longitude}`);
        handleLoading(true);
        handleLoadFromStage(ls);
      }
    }
  }, []);

  useEffect(() => {
    // console.log('MAP:', mapSrc);
  }, [mapSrc]);

  useEffect(() => {}, [location]);
  useEffect(() => {}, [addressSelected]);
  useEffect(() => {}, [showBannerContent]);

  // Handles the data from 28 east event call
  useEffect(() => {
    if (jsonSearchData !== null) {
      // console.log('Json search data comes from event listener :', jsonSearchData.services);

      if (jsonSearchData.place) {
        handlePlaceSelect(jsonSearchData.place, 'map');
      }

      /* -------------------- SERVICES FROM 28 EAST SECTION ------------------- */
      if (jsonSearchData.services) {
        // console.log('Services from json', jsonSearchData.services);
        sethasServices(true);
        handleServicesUpdate(jsonSearchData.services);
        handleLoading(false);
      }
    }
  }, [jsonSearchData]);

  /* 
    THIS IS THE CALL BACK TO 28 EAST TO ENSURE WE GET PRODUCTS AND SERVICES BACK FROM THEM AND 
    AS THE MAP UPDATES WE NEED TO GET THE NEW RELEVENT PRODUCTS AND SERVICES FROM THEM
    Event handler utilizing useCallback ... so that reference never changes.
  */
  const receiveMessage = useCallback(
    (event: any) => {
      if (event.origin === 'https://coverage.mweb.co.za') {
        // console.log('event message', JSON.parse(event.data));
        handleLoading(true);
        setJsonSearchData(JSON.parse(event.data));
      }
    },
    [nextWindow]
  );

  // event
  useEventListener('message', receiveMessage, nextWindow);
  /* -------------------- END 28 EAST SECTION ------------------------------------------------- */

  /* AUTOCOMPLETE OBJECT REF THAT GETS CHANGED ONCE USER SELECTS A PLACE FROM THE DROP DOWN LIST */
  function handleAutoCompleteChanges(autoComplete: any) {
    // setLocation, setLoadingServices, autoCompleteRef, setShowDialog
    /*
      to get the namespace for google (new google.maps.places.Autocomplete) run npm i @types/google.maps 
      if this shows an error it needs the the types installed to build 
      but is not a dev dependency so will work it just affects the builds
    */
    autoComplete = new google.maps.places.Autocomplete(autoComplete.current, {
      componentRestrictions: { country: 'za' },
    });
    autoComplete.setFields(['formatted_address', 'address_components', 'geometry', 'place_id', 'types']);
    autoComplete.addListener('place_changed', () => handlePlaceSelect(autoComplete.getPlace(), 'bar'));
  }
  /* -------------------- END AUTOCOMPLETE SECTION ------------------------------------------------- */

  // handles changin the current state to the new location recieved used by both the map and search bar
  function handlePlaceSelect(addressObject: any, type: 'map' | 'bar') {
    // console.log('data changed handlePlaceSelect', addressObject);

    if (addressObject && typeof addressObject === 'object') {
      let lat = addressObject.geometry.location.lat;
      let long = addressObject.geometry.location.lng;

      let locationObject = {
        streetNumber: addressObject.address_components.find((x: any) => x.types.includes('street_number')),
        streetName: addressObject.address_components.find((x: any) => x.types.includes('route')),
        suburb: addressObject.address_components.find((x: any) => x.types.includes('sublocality')),
        city: addressObject.address_components.find((x: any) => x.types.includes('locality')),
        province: addressObject.address_components.find((x: any) => x.types.includes('administrative_area_level_1')),
        postalCode: addressObject.address_components.find((x: any) => x.types.includes('postal_code')),
        address: addressObject.formatted_address,
        // LATS AND LONGS
        latitude: typeof lat === 'function' ? lat() : lat,
        longitude: typeof long === 'function' ? long() : long,
        latlong: typeof lat === 'function' && typeof long === 'function' ? `${lat()},${long()}` : `${lat},${long}`,
        coverageLatlong: typeof lat === 'function' && typeof long === 'function' ? `${lat()}/${long()}` : `${lat}/${long}`,
      };

      handleInputString(addressObject.formatted_address);
      setLocation(locationObject);
      setaddressSelected(true);
      handleResetBanner(false);

      if (type === 'bar') {
        setMapSrc(`${mapStringFibre}location=${locationObject.latlong}`);
        // handleLoading(true);
      }

      getServices(locationObject.latitude, locationObject.longitude)
        .then((res) => {
          // console.log('res', res);
          sethasServices(true);
          handleServicesUpdate(res);
          handleLoading(false);
        })
        .catch((err) => {
          console.error('could not get services', err);
          sethasServices(false);
          handleServicesUpdate([]);
          handleLoading(false);
        });

      setUserDataSearchAddress(addressObject);
    }
  }

  // RESET THE UI AND DATA CHANGE ADRESS BTN PRESSED
  function handleChangeLocBtn() {
    // console.log('Chnage location requested');
    removeLocalStorageItem('storedCoverageData');
    removeLocalStorageItem('userData');
    setLocation('');
    handleInputString('');
    setJsonSearchData(null);
    setaddressSelected(false);
    sethasServices(false);
    handleServicesUpdate([]);
    handleResetBanner(true);
    handleResetMap(false);
    handleLoading(false);
    let userData: IUserData = UserDataService.initialiseUserData();
    setLocalStorageItem('userData', userData);
  }

  // handles loading from local storage and sets everything up in the background giving the user a seamless expierence
  function handleLoadFromStage(addressObject: IUserData) {
    // console.log('data changed handlePlaceSelect', addressObject);

    if (addressObject !== undefined && typeof addressObject === 'object') {
      let lat = addressObject.addressSearch.latitude;
      let long = addressObject.addressSearch.longitude;

      let locationObject = {
        streetNumber: addressObject.addressSearch.streetNumber,
        streetName: addressObject.addressSearch.street,
        suburb: addressObject.addressSearch.suburb,
        city: addressObject.addressSearch.town,
        province: addressObject.addressSearch.province,
        postalCode: addressObject.addressSearch.postalCode,
        address: addressObject.addressSearch.formattedAddress,
        // LATS AND LONGS
        latitude: lat,
        longitude: long,
        latlong: `${lat},${long}`,
        coverageLatlong: `${lat}/${long}`,
      };

      handleInputString(addressObject.addressSearch.formattedAddress);
      setLocation(locationObject);
      setaddressSelected(true);
      handleResetBanner(false);

      setMapSrc(`${mapStringFibre}location=${locationObject.latlong}`);
      // handleLoading(true);

      getServices(Number(lat), Number(long))
        .then((res) => {
          sethasServices(true);
          handleServicesUpdate(res);
          handleLoading(false);
          setaddressSelected(true);
        })
        .catch((err) => {
          console.error('could not get services', err);
          sethasServices(false);
          handleServicesUpdate([]);
          handleLoading(false);
          setaddressSelected(false);
        });

      handleLoading(false);
    }
  }

  return (
    <div>
      {/* input  */}
      <div className='flex flex-col lg:flex-row px-2 sm:px-4 md:p-0 justify-center content-center items-center w-full mb-14 mt-10 pb-2 md:pb-0'>
        {/* Input */}
        <div className='flex flex-col w-[350px] sm:w-[450px] md:w-[600px] lg:w-[740px] xl:w-[740px] 2xl:w-[740px] justify-start'>
          {showBannerContent && (
            <p id='Coveragedock' className='text-lg md:text-2xl lg:text-3xl text-center font-bold text-black'>
              {labelText}
            </p>
          )}

          <div className={`flex flex-row w-full justify-between items-center bg-white border-2 mt-2 mb-2 ${showBannerContent ? 'mw-pulsing border-mwblue' : 'border-mwgray-l'}`}>
            <input
              className='w-full outline-none border-none p-4 font-normal text-xl placeholder-opacity-100 placeholder-mwgrey-l coverage'
              ref={autoCompleteRef}
              id='coverage'
              placeholder={placeholderText}
              onChange={(e) => {
                handleLoading(true);
                setaddressSelected(false);
                setLocation(e.target.value);
              }}
              value={typeof location === 'string' ? location : location.address}
            />

            <div className='flex justify-between md:h-14 flex-col'>
              <MwebButton
                type='button'
                disabled={false}
                containerStyle='md:h-14'
                addedStyle='block btn-check-coverage-inline btn-check-coverage h-full'
                padding='py-4 px-8'
                id='btn-check-coverage-inline'
                variant={showBannerContent ? `darkorange` : `blueSelect`}
                click={() => handleChangeLocBtn()}
              >
                <FontAwesomeIcon icon={faSearch} className='md:hidden h-5' />
                <div className={`hidden md:inline-block ${showBannerContent ? 'font-bold' : ''}`}>
                  {showBannerContent ? parse('Check&nbsp;Coverage') : parse('Change&nbsp;Address')}
                </div>
              </MwebButton>
            </div>
          </div>

          {showBannerContent && (
            <p id='Coveragedock' className='text-base font-bold text-black'>
              {underlabelText}
            </p>
          )}
        </div>

        {!showBannerContent && showAdressChangeAndMap && (
          <div className='flex flex-row justify-center content-center items-center w-24 mx-4'>
            <ViewMapButton toggleMap={() => handleResetMap(!showMap)} showMap={showMap} styles={`${page === 'mop-step2' && !hasServices ? 'hidden' : 'block lg:inline-block'}`} />

            <MwebButton
              type='button'
              disabled={false}
              containerStyle='block md:hidden ml-5'
              addedStyle='block btn-check-coverage-inline h-full'
              padding='py-4 px-6'
              id='btn-check-coverage-inline'
              variant={showBannerContent ? `darkorange` : `blueSelect`}
              click={() => handleChangeLocBtn()}
            >
              <div className='inline-block'>{parse('Change&nbsp;Address')}</div>
            </MwebButton>
          </div>
        )}
      </div>

      {/* map */}
      {addressSelected && showMap && showAdressChangeAndMap && (
        <div className={`${styles.ar16x9} mt-8`}>
          <iframe id='mweb-coverage-map-iframe' className='arContent' src={mapSrc} />
        </div>
      )}
    </div>
  );
}
