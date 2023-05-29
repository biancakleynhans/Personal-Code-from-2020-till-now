/*
    ADMIN USER PROFILE PAGE LANDING HERE THE ADMIN USER WILL BE ABLE TO GET TO AND DO ALL THAT
    THE APP REQUIRES THEM TO BE ABLE TO HAVE ACESS TO AND BE ABLE TO DO 
*/

import React, { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { UserTypes } from '../../constants/AppConstants';
import { useRouter } from 'next/router';
import { BTN_COLORS } from '../../constants/Styling';
import { iUser, iUserUpdate } from '../../models/User';
import ProfileComponent from '../../components/e-comms/shared/ProfileComponent';

interface iButton {
  url: string;
  title: string;
}

interface iButton2 {
  boolVal: boolean;
  setBoolVal: () => void;
  title: string;
}

export default function AdminDashboard() {
  const { currUser, users, updateUserProfile } = useAuth();

  const router = useRouter();

  const [type, settype] = useState<UserTypes>(UserTypes.user);
  const [showmain, setshowmain] = useState<boolean>(currUser?.role === UserTypes.user ? true : false);
  const [showProfile, setshowProfile] = useState<boolean>(false);
  const [showshopping, setshowshopping] = useState<boolean>(true);

  useEffect(() => {
    if (currUser) {
      let t: UserTypes = currUser ? currUser.role : UserTypes.user;
      settype(t);
      setshowProfile(currUser?.role === UserTypes.user ? true : false);
    } else {
      settype(UserTypes.user);
    }
  }, [currUser]);

  useEffect(() => {}, [type]);
  useEffect(() => {}, [users]);

  /* SIDE PANNEL BUTTONS*/
  const StandardBtns: iButton2[] = [
    {
      boolVal: showProfile,
      setBoolVal: () => setshowProfile(!showProfile),
      title: 'Profile',
    },
  ];

  const ShoppingButtons: iButton[] = [
    {
      url: `/${type}/products`,
      title: 'Products',
    },
    {
      url: `/${type}/orders`,
      title: 'Orders',
    },
    {
      url: `/${type}/sales`,
      title: 'Sales',
    },
  ];

  function buttonListContainer(groupTile: string, bool: boolean, setBool: () => void, buttonsList: iButton[]) {
    return (
      <li className='rounded border-2 border-primary-300 w-[385px] mb-4'>
        <button className='flex flex-row justify-between content-center items-center w-full px-2' onClick={() => setBool()}>
          <p className='text-lg'>
            {bool ? 'HIDE' : 'SHOW'} {groupTile.toUpperCase()}
          </p>
          {bool ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </button>

        {bool && (
          <div className='ml-4'>
            {buttonsList.map((item, i) => (
              <div key={i}>
                <button className={BTN_COLORS} onClick={() => router.push(item.url)}>
                  GO TO {item.title.toUpperCase()}
                </button>
                <br />
              </div>
            ))}
          </div>
        )}
      </li>
    );
  }

  function buttonListContainer2(groupTile: string, bool: boolean, setBool: () => void, buttonsList: iButton2[]) {
    return (
      <li className='rounded border-2 border-primary-300 w-[385px] mb-4'>
        <button className='flex flex-row justify-between content-center items-center w-full px-2' onClick={() => setBool()}>
          <p className='text-lg'>
            {bool ? 'HIDE' : 'SHOW'} {groupTile.toUpperCase()}
          </p>
          {bool ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
        </button>

        {bool && (
          <div className='ml-4'>
            {buttonsList.map((item, i) => (
              <div key={i}>
                <button className={BTN_COLORS} onClick={() => item.setBoolVal()}>
                  {item.boolVal ? 'Hide' : 'Show'} {item.title}
                </button>
                <br />
              </div>
            ))}
          </div>
        )}
      </li>
    );
  }

  const buttonsList: iButton[] = [
    { title: 'Brands', url: '/admin/brands' },
    { title: 'Categories', url: '/admin/categories' },
    { title: 'Sub Categories', url: '/admin/subcategories' },
    { title: 'Products', url: '/admin/products' },
    { title: 'Promotions', url: '/admin/promo' },
    { title: 'Sales', url: '/admin/sales' },
    { title: 'Orders', url: '/admin/orders' },
  ];

  return (
    <>
      <h1 className='text-center w-full'>Admin Dash</h1>
      <div className='flex flex-col md:flex-row justify-between mx-2'>
        {/* BUTTONS for display */}

        {currUser?.role !== UserTypes.user && (
          <div className='w-full lg:w-[20%]'>
            <ul className='my-4 text-left'>
              {/* STANDARD */}
              {buttonListContainer2('all main actions', showmain, () => setshowmain(!showmain), StandardBtns)}

              {/* SHOPPING */}
              {/* {buttonListContainer('all online store pages', showshopping, () => setshowshopping(!showshopping), ShoppingButtons)} */}
              {buttonsList.map((btn, index) => (
                <button
                  onClick={() => router.push(btn.url)}
                  key={index}
                  className='col-span-1 text-center rounded shadow text-lg p-2 flex flex-col justify-start dark:bg-primary-700 bg-primary-400'
                >
                  <h5 className='underline font-serif'>{btn.title.toUpperCase()} :</h5>
                  <p>View, Update, Create new {btn.title}</p>
                </button>
              ))}
            </ul>
          </div>
        )}

        <div className='w-full lg:w-[72%]'>
          {/* profile */}
          {showProfile && currUser && (
            <ProfileComponent currentUser={currUser} callBack={(uid: string, user: iUser, newData: iUserUpdate) => updateUserProfile(uid, user, newData)} />
          )}
          {/* Other admin stuff here */}
        </div>
      </div>
    </>
  );
}
