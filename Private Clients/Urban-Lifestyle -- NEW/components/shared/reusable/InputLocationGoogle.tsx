import React, { useState, Fragment } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { INPUT, LABEL } from '../../../constants/Styling';

interface iProps {
  placeholderText: string;
  handleAddressSelect: (place: string) => void;
  type: 'event';
}

export default function InputLocationGoogle(props: iProps) {
  const [adress, setadress] = useState('');

  function handleSelect(address: any) {
    setadress(address);
    geocodeByAddress(address)
      .then((results) => {
        // console.log('SELECTED', address, results);
        props.handleAddressSelect(address);
        getLatLng(results[0]);
      })
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  }

  return (
    <PlacesAutocomplete value={adress} onChange={(e) => setadress(e)} onSelect={(e) => handleSelect(e)} searchOptions={{ componentRestrictions: { country: 'ZA' } }}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='w-full flex-col'>
          <div className='w-full flex-col my-2'>
            <label className={LABEL}>Location of {props.type}</label>
            <input
              className={INPUT}
              {...getInputProps({
                placeholder: `${props.placeholderText}`,
                // className: `location-search-input`,
              })}
            />
          </div>
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}

            {suggestions.map((suggestion, index) => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active ? { cursor: 'pointer' } : { cursor: 'pointer' };

              return (
                <Fragment key={index}>
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
