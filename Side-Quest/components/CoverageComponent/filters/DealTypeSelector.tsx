import React, { Fragment, useEffect, useState } from 'react';
import { ICampaign } from '../services/campaignsService';
import { Popover, Transition } from '@headlessui/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/DealTypeSelector.module.css';
import { iCampAdd } from '../coverage/ProductsCompomnent';

interface iProps {
  type: string;
  campaignCodes: any[];
  visibleCampaigns: ICampaign[];
  updateDealType: (e: ICampaign[]) => void;
}

export default function DealTypeSelector(props: iProps) {
  const { type, campaignCodes, visibleCampaigns, updateDealType } = props;

  const [selectedCampains, setselectedCampains] = useState<ICampaign[]>(visibleCampaigns);
  const [selectedCampainsLte, setselectedCampainsLte] = useState<any[]>(visibleCampaigns);

  useEffect(() => {}, [props]);
  useEffect(() => {}, [selectedCampains, selectedCampainsLte]);

  useEffect(() => {
    if (visibleCampaigns) {
      if (type === 'fibre') {
        let use: ICampaign[] = [];

        visibleCampaigns.forEach((c) => {
          // console.log(c.isDefaultCampaign, c.isStandardCampaign, c.isPrivateCampaign);
          if (c.isDefaultCampaign) {
            use.push(c);
          }
        });

        setselectedCampains(use);
      } else {
        // console.log('visible campaings LTE', campaignCodes, visibleCampaigns);
        setselectedCampainsLte(visibleCampaigns);
      }
    }
  }, [visibleCampaigns]);

  function handleSelected(campain: ICampaign) {
    // console.log('handle selected campain', campain);
    let clone = selectedCampains;

    if (clone.length === 0) {
      clone.push(campain);
      setselectedCampains(clone);
    } else {
      // console.log('something in so lets do this', clone);
      if (clone.indexOf(campain) === -1) {
        clone.push(campain);
        setselectedCampains(clone);
      } else {
        clone.splice(clone.indexOf(campain), 1);
        setselectedCampains(clone);
      }
    }
    updateDealType(clone);
  }

  function handleSelectedLte(c: iCampAdd) {
    let clone = campaignCodes;
    let index = clone.indexOf(c);

    // console.log('change lte deal type', index, c, '>', clone, '>', selectedCampains);

    c.selected = !c.selected;
    clone.splice(index, 1, c);
    // console.log('clone chnaged', clone);

    setselectedCampainsLte(clone);
    updateDealType(clone);
  }

  const DesktopView = () => {
    return (
      <div className='hidden xl:flex xl:w-full justify-center items-center py-1'>
        {type === 'fibre'
          ? campaignCodes
              ?.filter((c) => c.isDefaultCampaign && c.promocodes.length > 1)
              .map((c, i) => (
                <button key={c.code} className={`bg-mwblue px-20 text-white w-full xl:w-auto py-2 border mwCardShadow border-mwgray-l ${styles.selectCards}`} onClick={() => {}}>
                  {c.name?.toString().replace('and', '+')}
                </button>
              ))
          : campaignCodes?.map((c, i) => {
              return (
                <button
                  key={c.key}
                  className={`${
                    c.selected ? 'bg-mwblue text-white' : 'filter grayscale hover:grayscale-0'
                  } w-full xl:w-auto px-3 xl:px-6 py-2 border mwCardShadow border-mwgray-l ${styles.selectCards}`}
                  onClick={() => (type === 'fibre' ? handleSelected(c) : handleSelectedLte(c))}
                >
                  {c.label?.toString().replace('purchase', '')}
                </button>
              );
            })}
      </div>
    );
  };

  const MobileView = () => {
    return (
      <Popover className='xl:hidden relative w-full laptop:mr-3'>
        {({ open }) => (
          <>
            <Popover.Button className='focus:outline-none w-full laptop:px-0'>
              <div className='flex flex-col laptop:flex-row justify-center items-center w-full xl:w-28 px-1 laptop:px-4 py-2 my-3 border mwCardShadow border-mwgray-l filter grayscale hover:grayscale-0'>
                <p>Deal</p>
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
              <Popover.Panel static className='w-[175px] absolute right-0 z-10'>
                <div className='overflow-hidden border border-mwgray-l'>
                  <div className='relative bg-white p-4'>
                    {type === 'fibre'
                      ? campaignCodes
                          ?.filter((c) => c.isDefaultCampaign && c.promocodes.length > 1)
                          .map((c, index) => (
                            <>
                              <span key={`${c.code}-${index.toString()}`} className='flex justify-start items-center laptop:w-40'>
                                <input
                                  id={`${c.code}`}
                                  name={c.code !== null ? c.code : ''}
                                  checked={index > 0 ? selectedCampains.includes(c) : true}
                                  onChange={() => handleSelected(c)}
                                  className={`${styles.checkbox}`}
                                  type='checkbox'
                                />
                                <label htmlFor={`${c.code}`} className={`${styles.label}`}>
                                  <span className={`${styles.RangeSelectCheckBox}`}></span>
                                  &nbsp;
                                  {c.name?.toString().replace('and', '+')}
                                </label>
                              </span>
                            </>
                          ))
                      : campaignCodes?.map((c, index) => {
                          // console.log('LTE', c);
                          return (
                            <span key={`${c.key}-${index.toString()}`} className='flex justify-start items-center laptop:w-40'>
                              <input
                                // id={`${c.key}`}
                                name={c.key !== null ? c.key : ''}
                                checked={c.selected}
                                onChange={() => handleSelectedLte(c)}
                                className={`${styles.checkbox}`}
                                type='checkbox'
                              />
                              <label htmlFor={`${c.key}`} className={`${styles.label}`}>
                                <span className={`${styles.RangeSelectCheckBox}`}></span>
                                &nbsp;
                                {c?.label?.toString().replace('purchase', '')}
                              </label>
                            </span>
                          );
                        })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  return (
    <div>
      <DesktopView />
      <MobileView />
    </div>
  );
}
