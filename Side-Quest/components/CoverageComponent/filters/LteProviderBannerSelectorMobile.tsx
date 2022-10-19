import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iProvAdd } from './FibreProviderBannerSelectorMobile';
import styles from '../styles/LteProviderBannerSelectorMobile.module.css';

interface iProps {
  visibleProviders: iProvAdd[];
  updateSelectedProviders: any;
  hasCoverageSearch: boolean;
}

export default function LteProviderBannerSelectorMobile(props: iProps) {
  const { hasCoverageSearch, updateSelectedProviders, visibleProviders } = props;

  useEffect(() => {
    // console.log('MOBILE LTE ', visibleProviders, hasCoverageSearch);
  }, [hasCoverageSearch, visibleProviders]);

  function handleChange(index: number) {
    let clone = visibleProviders;
    clone[index].selected = !clone[index].selected;

    // update parent component
    updateSelectedProviders(clone);
  }

  return (
    <Popover className='relative w-full laptop:mr-3'>
      {({ open }) => (
        <>
          <Popover.Button className='focus:outline-none w-full laptop:px-0'>
            <div className='flex flex-col laptop:flex-row justify-center items-center w-full laptop:w-28 px-1 laptop:px-4 py-2 my-3 border mwCardShadow border-mwgray-l filter grayscale hover:grayscale-0'>
              <p>Providers</p>
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
            <Popover.Panel static className='w-[175px] absolute left-0 z-10'>
              <div className='overflow-hidden border border-mwgray-l'>
                <div className='relative bg-white p-4'>
                  {visibleProviders.map((p, i) => (
                    <span className='flex justify-start items-center laptop:w-40'>
                      <input id={p.coverageCode} name={p.coverageCode} checked={p.selected} onChange={() => handleChange(i)} className={`${styles.checkbox}`} type='checkbox' />
                      <label htmlFor={p.coverageCode} className={`${styles.label}`}>
                        <span className={`${styles.RangeSelectCheckBox}`}></span>&nbsp;
                        {p.name}
                      </label>
                    </span>
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

LteProviderBannerSelectorMobile;
