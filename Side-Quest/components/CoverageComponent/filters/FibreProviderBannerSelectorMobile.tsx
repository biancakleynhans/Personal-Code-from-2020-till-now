import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/FibreProviderBannerSelectorMobile.module.css';

export interface iProvAdd {
  selected: boolean;
  code: string;
  name: string;
  productSubcat: string;
  logoUrl: string;
  productUrlSlug: string;
  coverageCode: string;
  active: boolean;
}

interface iProps {
  buttonLabel: string;
  popoverStyle: string;
  selectedProviders: iProvAdd[];
  updateSelected: (newArr: iProvAdd[]) => void;
}

export default function FibreProviderBannerSelectorMobile(props: iProps) {
  const { buttonLabel, popoverStyle, selectedProviders, updateSelected } = props;

  useEffect(() => {}, [selectedProviders]);

  function handleChange(index: number) {
    let clone = selectedProviders;
    clone[index].selected = !clone[index].selected;

    // update parent component
    updateSelected(clone);
  }

  function SelectionItem(range: iProvAdd, index: number) {
    return (
      <span className='flex justify-start items-center laptop:w-40'>
        <input id={range.code} name={range.code} checked={range.selected} onChange={(e) => handleChange(index)} className={`${styles.checkbox}`} type='checkbox' />
        <label htmlFor={range.code} className={`${styles.label}`}>
          <span className={`${styles.RangeSelectCheckBox}`}></span>&nbsp;
          {range.name}
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
                  {selectedProviders.map((range, index) => (
                    <Fragment key={range.coverageCode}>{SelectionItem(range, index)}</Fragment>
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
