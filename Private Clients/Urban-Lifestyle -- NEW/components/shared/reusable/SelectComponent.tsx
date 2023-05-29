import React, { useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { SELECT_STYLE } from '../../../constants/Styling';

export interface iSelectType {
  label: string;
  value: string;
  disabled: boolean;
}

interface iProps {
  labelText: string;
  inputValueMulti: iSelectType[];
  inputValueString: string;
  placeholder: string;
  handleChange: (val: any) => void;
  options: iSelectType[];
  type: 'user' | 'string';
  isMulti: boolean;
}

export default function SelectComponent(props: iProps) {
  const { options, labelText, handleChange, inputValueMulti, inputValueString, type, isMulti } = props;

  useEffect(() => {}, [props]);

  return (
    <div className='flex-col'>
      {isMulti ? (
        <>
          <label className='text-primary-700 dark:text-primary-100'>{labelText}</label>
          <MultiSelect
            className='text-black my-2'
            options={options}
            value={inputValueMulti}
            onChange={(e: any) => handleChange(e)}
            labelledBy='Select'
            hasSelectAll={false}
            ClearIcon={false}
          />
        </>
      ) : (
        <div className='w-full flex flex-col justify-start content-center items-center my-2 '>
          <label className='text-primary-700 dark:text-primary-100 mb-1'>{labelText}</label>
          <select value={inputValueString} onChange={(e: any) => handleChange(e.target.value!)} className={SELECT_STYLE}>
            {options.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
