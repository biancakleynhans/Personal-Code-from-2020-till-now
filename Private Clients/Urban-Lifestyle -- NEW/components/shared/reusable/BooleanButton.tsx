import Raect, { useState } from 'react';
import { IconContext } from 'react-icons';
import Switch from 'react-switch';
import { BiShow, BiHide } from 'react-icons/bi';

interface iProps {
  visible: boolean;
  handleChange: (value: boolean) => void;
  title: string;
}

export default function BooleanButton(props: iProps) {
  const { handleChange, visible, title } = props;

  return (
    <div className='flex flex-row justify-between content-center items-center bg-[#eee] dark:bg-[#555] p-2 rounded'>
      <button className='text-slate-800 dark:text-slate-200 mx-2 font-medium text-lg' onClick={() => handleChange(!visible)}>
        {visible ? 'Hide' : 'Show'} {title}
      </button>
    </div>
  );
}
