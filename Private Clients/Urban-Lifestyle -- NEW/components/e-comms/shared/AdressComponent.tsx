import React, { useState } from 'react';
import { SUBMIT_BTN } from '../../../constants/Styling';
import { iAdress, ProvinceList } from '../../../models/User';
import CardContainer from '../../shared/reusable/CardContainer';
import InputComponent from '../../shared/reusable/InputComponent';
import SelectComponent from '../../shared/reusable/SelectComponent';

interface iProps {
  defaultAddr: iAdress;
  onSub: (update: iAdress) => void;
}

export default function AddEditAdress(props: iProps) {
  const { defaultAddr, onSub } = props;

  const [street, setstreet] = useState(defaultAddr.street);
  const [number, setnumber] = useState(defaultAddr.number);
  const [suburb, setsuburb] = useState(defaultAddr.suburb);
  const [city, setcity] = useState(defaultAddr.city);
  const [postalCode, setpostalCode] = useState(defaultAddr.postalCode);
  const [province, setprovince] = useState(defaultAddr.province);

  function doSub() {
    console.log('>>>', street, number, suburb, city, postalCode, province);
    let send: iAdress = {
      street,
      number,
      suburb,
      city,
      postalCode,
      province,
      country: 'South Africa',
      isDefault: true,
    };
    console.log('SENDING: ', send);
    //onSub(send);
  }

  let s = 'Complex / Building Name / Unit Number';
  let p = 'Province';
  return (
    <CardContainer isDark={true} width='w-[300px] mr-4 ml-2' title='Adress' subtitle='Your address information. Click the edit button to update'>
      <InputComponent handleChange={(e) => setstreet(e)} inputValue={street} labelText='STREET *' placeholder='street' type='text' />
      <InputComponent handleChange={(e) => setnumber(e)} inputValue={number} labelText={`${s.toUpperCase()} *`} placeholder={s} type='text' />
      <InputComponent handleChange={(e) => setsuburb(e)} inputValue={suburb} labelText='SUBURB *' placeholder='subburb' type='text' />
      <InputComponent handleChange={(e) => setcity(e)} inputValue={city} labelText='CITY *' placeholder='city' type='text' />
      <InputComponent handleChange={(e) => setpostalCode(e)} inputValue={postalCode} labelText='POSTAL CODE *' placeholder='postal code' type='text' />

      <SelectComponent
        handleChange={(e) => setprovince(e)}
        inputValueMulti={[]}
        inputValueString={province}
        isMulti={false}
        labelText={`${p.toUpperCase()} *`}
        options={ProvinceList.map((p) => ({ disabled: false, label: p, value: p }))}
        placeholder='Please select your provice'
        type='string'
      />

      <button className={SUBMIT_BTN} onClick={() => doSub()}>
        Save
      </button>
    </CardContainer>
  );
}
