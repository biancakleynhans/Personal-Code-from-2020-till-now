/*
 Container and intermediatator function for Google input 
 This will handle display text and keep it isolated and clean 
 if new extra display around this component is needed this will handle it and pass it through
*/

import React, { useState } from 'react';
import { IServiceEntry } from '../interfaces/Services';
import InputGoogleLocation from '../shared/InputGoogleLocation';

interface iProps {
  showBanner: boolean;
  page: string;
  handleBanner: (value: boolean) => void;
  handleServicesFrom28East: (services: IServiceEntry[]) => void;
  handleLoadingServices: (value: boolean) => void;
  handleInputString: (e: string) => void;
  labelText: string;
  placeholderText: string;
  termsAndConditionsText: string;
  useDefaults: boolean;
  showAdressChangeAndMap: boolean;
}

export default function CoverageInput(props: iProps) {
  const {
    handleBanner,
    handleServicesFrom28East,
    handleLoadingServices,
    handleInputString,
    showBanner,
    page,
    labelText,
    placeholderText,
    termsAndConditionsText,
    useDefaults,
    showAdressChangeAndMap,
  } = props;

  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <InputGoogleLocation
      handleResetBanner={(value: boolean) => handleBanner(value)}
      showBannerContent={showBanner}
      handleResetMap={(value: boolean) => setShowMap(value)}
      showMap={showMap}
      labelText={useDefaults ? 'Enter your address to get these amazing deals now' : labelText}
      placeholderText={useDefaults ? 'Enter address and select from the dropdown menu' : placeholderText}
      underlabelText={useDefaults ? '' : termsAndConditionsText}
      handleServicesUpdate={(services: IServiceEntry[]) => handleServicesFrom28East(services)}
      page={page}
      handleLoading={(value: boolean) => handleLoadingServices(value)}
      handleInputString={(value: string) => handleInputString(value)}
      showAdressChangeAndMap={showAdressChangeAndMap}
    />
  );
}
