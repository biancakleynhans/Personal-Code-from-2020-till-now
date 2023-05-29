import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { INPUT, LABEL } from '../../../constants/Styling';

interface iProps {
  labelText: string;
  inputValue: Date;
  placeholder: string;
  handleChange: (val: any) => void;
}

export default function DateSelectComponet(props: iProps) {
  const { labelText, inputValue, handleChange } = props;

  useEffect(() => {}, [labelText, inputValue]);

  return (
    <div className='flex-col'>
      <label className={LABEL}>{labelText}</label>
      <div className={INPUT}>
        <DatePicker
          selected={inputValue}
          onSelect={(d) => {
            handleChange(d);
          }} //when day is clicked
          onChange={(d) => {
            handleChange(d);
          }} //only when value has changed
        />
      </div>
    </div>
  );
}
