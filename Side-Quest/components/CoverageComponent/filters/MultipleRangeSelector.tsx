import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/MultipleRangeSelector.module.css';
import { INumberRange } from '../utils/types';

export interface iNumAdd extends INumberRange {
  selected: boolean;
}

interface iProps {
  buttonLabel: string;
  popoverStyle: string;
  // ranges: INumberRange[];
  selectedRanges: iNumAdd[];
  updateSelected: (newArr: iNumAdd[]) => void;
}

export default function MultipleRangeSelector(props: iProps) {
  const { buttonLabel, popoverStyle, selectedRanges, updateSelected } = props;

  const [arr, setarr] = useState<iNumAdd[]>([]);

  useEffect(() => {
    setarr(selectedRanges);
  }, [selectedRanges]);

  useEffect(() => {}, [arr]);

  function handleChange(index: number) {
    // console.log('selected', arr[index].selected, selectedRanges[index].selected);
    let clone = arr;
    clone[index].selected = !clone[index].selected;

    // console.log(index, selectedRanges, '???', clone);
    setarr(clone);

    // update parent component
    updateSelected(clone);
  }

  function SelectionItem(range: iNumAdd, index: number) {
    return (
      <span className='flex justify-start items-center laptop:w-40'>
        <input id={range.key} name={range.key} checked={range.selected} onChange={(e) => handleChange(index)} className={`${styles.checkbox}`} type='checkbox' />
        <label htmlFor={range.key} className={`${styles.label}`}>
          <span className={`${styles.RangeSelectCheckBox}`}></span>&nbsp;
          {range.label}
        </label>
      </span>
    );
  }

  return (
    <Popover className='relative w-full laptop:mr-3'>
      {({ open }) => (
        <>
          <Popover.Button className='focus:outline-none w-full laptop:px-0'>
            <div className='flex flex-col laptop:flex-row justify-center items-center w-full xl:w-28 px-1 laptop:px-4 py-2 my-3 xl:my-1 border mwCardShadow border-mwgray-l filter grayscale hover:grayscale-0'>
              <p>{buttonLabel} </p>
              <FontAwesomeIcon icon={faChevronDown} className='mx-1 h-3' />
            </div>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className={`${popoverStyle}`}>
              <div className='overflow-hidden border border-mwgray-l'>
                <div className='relative bg-white p-4'>
                  {arr.map((range, index) => (
                    <Fragment key={index}>{SelectionItem(range, index)}</Fragment>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
