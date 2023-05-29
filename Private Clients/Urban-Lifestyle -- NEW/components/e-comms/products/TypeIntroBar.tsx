import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import SelectComponent, { iSelectType } from '../../shared/reusable/SelectComponent';
import BooleanButton from '../../shared/reusable/BooleanButton';
import BreadCrumbs, { iBreadcrumb } from '../../shared/reusable/BreadCrumbs';

interface iProps {
  title: string;
  description: string;
  // pathString: string;
  breadCrumbs: iBreadcrumb[];

  colCount: string;
  handlecolCount: (count: string) => void;

  displayTopfilterBtn: string;
  handleTopfilter: (vale: string) => void;

  displaySidefilterBtn: boolean;
  handleSidefilter: (vale: boolean) => void;
}

const colDisplays = ['2', '3', '4', '6', '9', '12'];

const filterTypesTop: iSelectType[] = [
  { disabled: false, label: 'Newest', value: 'date' },
  { disabled: false, label: 'Price High to low', value: 'decending' },
  { disabled: false, label: 'Price Low to high', value: 'acending' },
];

export default function TypeIntroBar(props: iProps) {
  const { description, breadCrumbs, title, colCount, handlecolCount, displaySidefilterBtn, displayTopfilterBtn, handleSidefilter, handleTopfilter } = props;

  useEffect(() => {}, [colCount, breadCrumbs, colCount, displaySidefilterBtn, displayTopfilterBtn]);

  function createDisplayGridBtn(count: number) {
    let innerDots: JSX.Element[] = [];

    for (let i = 0; i < count; i++) {
      innerDots.push(<div key={i} className={`rounded-full h-2 w-2 ${count.toString() === colCount ? 'bg-secondary-600' : 'bg-gray-600'}`} />);
    }

    return (
      <button className='border border-gray-300 dark:border-white  p-2 mx-0' onClick={() => handlecolCount(count.toString())}>
        <div className='flex flex-row justify-between content-center items-center'>{innerDots.map((dot, i) => dot)}</div>
        <div className='flex flex-row justify-between content-center items-center'>{innerDots.map((dot, i) => dot)}</div>
      </button>
    );
  }

  return (
    <div className='flex flex-col justify-between'>
      {/* Breadcrumbs */}
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <div className='flex flex-row justify-start content-center items-center ml-5 lg:ml-10 my-2 lg:my-5'></div>
      {/* Description section */}
      <div className='flex flex-col justify-center content-center items-center bg-primary-200 dark:bg-primary-600  py-5 lg:py-10'>
        <div className='mx-5 lg:mx-20 my-2 text-black dark:text-slate-300 text-2xl text-center font-semibold'> {title}</div>
        <div className='mx-5 lg:mx-20 my-2 text-black dark:text-slate-300 text-base text-center font-normal'> {description}</div>
      </div>
      {/* Display bar */}
      <div className='flex flex-col lg:flex-row justify-between content-center items-center mt-3 mx-5'>
        {/* Filter button */}
        <div className='flex flex-row justify-start content-center items-center'>
          {/* <BooleanButton title='Filters' handleChange={() => handleSidefilter(!displaySidefilterBtn)} visible={displaySidefilterBtn} /> */}
        </div>

        <div className='hidden lg:flex flex-row justify-end content-center items-center'>
          <div className='mx-4'>
            <SelectComponent
              handleChange={(e) => handleTopfilter(e)}
              inputValueMulti={[]}
              inputValueString={displayTopfilterBtn}
              isMulti={false}
              labelText=''
              options={filterTypesTop}
              placeholder=''
              type='string'
            />
          </div>

          <div className='flex flex-row justify-between content-center items-center'>
            {colDisplays.map((c, i) => (
              <Fragment key={i}>{createDisplayGridBtn(Number(c))}</Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
