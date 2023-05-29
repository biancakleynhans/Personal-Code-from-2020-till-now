import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FLEX_ROW_CENTER } from '../../../constants/Styling';
import InputComponent from './InputComponent';

interface iProps {
  labelString: string;
  inputString: null | string;
  type: 'email' | 'password' | 'tel' | 'text' | 'number';
  isEdit: boolean;
  handleChange: (e: any) => void;
  handleEdit: (e: any) => void;
}

const CONTAINER = 'flex flex-row justify-between content-center items-center mt-4';

export default function InputDisplayContainer(props: iProps) {
  const { handleChange, handleEdit, inputString, isEdit, labelString, type } = props;

  useEffect(() => {}, [props]);

  return (
    <div className={CONTAINER}>
      {isEdit ? (
        <InputComponent
          type={type}
          placeholder={inputString !== null ? inputString : labelString}
          inputValue={inputString ? inputString : ''}
          handleChange={(e: any) => handleChange(e)}
          labelText={labelString}
        />
      ) : (
        <p className='px-2'>{labelString}</p>
      )}

      <button onClick={() => handleEdit(!isEdit)} className={`${FLEX_ROW_CENTER} px-2`}>
        {isEdit ? <FaEdit size={24} color={'orange'} /> : <FaEdit size={24} />}
      </button>
    </div>
  );
}
