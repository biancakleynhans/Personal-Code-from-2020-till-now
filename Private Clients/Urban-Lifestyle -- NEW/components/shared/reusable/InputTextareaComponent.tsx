import React, { useEffect, useState } from 'react';
import { ERROR, INPUT, LABEL } from '../../../constants/Styling';
import { validateInput } from '../../../helpers/Validators';
import Error from '../alerts/ErrorInput';

interface iProps {
  labelText: string;
  inputValue: string;
  placeholder: string;
  handleChange: (val: any) => void;
  type: 'email' | 'password' | 'tel' | 'text' | 'number';
}

export default function InputTextareaComponent(props: iProps) {
  const { handleChange, inputValue, labelText, placeholder, type } = props;

  const [errorString, seterrorString] = useState<null | string>(null);

  useEffect(() => {}, [labelText, inputValue, handleChange, type, placeholder]);

  function handleErrors(input: string) {
    const { valid, error } = validateInput(type, input);

    if (!valid) {
      // console.log('we have errors', valid, error);
      seterrorString(error);
    } else {
      seterrorString('');
    }
  }

  return (
    <div className='w-full flex-col my-2'>
      <label className={LABEL}>{labelText}</label>
      <div className='flex flex-row flex-nowrap justify-start content-center items-center'>
        <textarea
          value={inputValue}
          onChange={(e) => {
            handleChange(e.target.value!);
            handleErrors(e.target.value!);
          }}
          className={`${INPUT} ${errorString ? ERROR : ''} flex-grow flex-wrap`}
          placeholder={placeholder}
          rows={5}
          cols={50}
        />
      </div>
      {errorString && <Error error={errorString} />}
    </div>
  );
}
