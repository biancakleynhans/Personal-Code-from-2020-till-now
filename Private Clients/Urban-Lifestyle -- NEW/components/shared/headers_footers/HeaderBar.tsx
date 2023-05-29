import React, { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import ThemeSwitch from '../switches/ThemeSwitch';
import { AllRoutes, TOP_MENU_LINKS } from '../../../routes/AllRoutes';
import { IoIosNotifications } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaUserLock, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { BRAND_COLORS, MENU_COLORS, MENU_DROP_ITEM, MENU_TOP_ITEM } from '../../../constants/Styling';
import { UserTypes } from '../../../constants/AppConstants';
import { useProductsData } from '../../../context/ProductsContext';
import CartPopUp from '../../../hooks/CartPopUp';
import { RiShoppingBasketFill } from 'react-icons/ri';

interface iRoute {
  path: string;
  name: string;
  color: string;
}

function MenuEntry({ linkUrl, name }: { linkUrl: string; name: string }): JSX.Element {
  return (
    <Link href={linkUrl}>
      <a className={MENU_TOP_ITEM}>{name}</a>
    </Link>
  );
}

function MenuEntryDropDown({ linkUrl, name, icon, color }: { linkUrl: string; name: string; icon: JSX.Element; color: string }): JSX.Element {
  return (
    <Link href={linkUrl}>
      <a className={`flex items-center px-3 py-3 ${MENU_DROP_ITEM}`}>
        {icon}
        <span className={`mx-1 ${color}`}>{name}</span>
      </a>
    </Link>
  );
}

function MainMenuItems(): JSX.Element {
  return (
    <div className='md:flex  mx-4 md:flex-row md:items-center md:mx-8'>
      {TOP_MENU_LINKS.map((link, i) => (
        <MenuEntry key={i} linkUrl={link.path} name={link.name} />
      ))}
    </div>
  );
}

export default function HeaderBar() {
  const router = useRouter();
  const { currUser } = useAuth();
  const { categories } = useProductsData();

  const [showMenu, setshowMenu] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  const [routesToUse, setroutesToUse] = useState<iRoute[]>([]);
  const [showSecondsHeaderBar, setshowSecondsHeaderBar] = useState<boolean>(true);

  const defaultRoutes: iRoute[] = [
    // { path: '/shop/cat1', name: 'CATEGORY', color: 'text-primary-400 dark:text-primary-600' },
    { path: '/shop/Sale', name: 'SALE', color: 'text-red-400 dark:text-red-600' },
    { path: '/shop/Offer', name: 'OFFERS', color: 'text-green-400 dark:text-green-600' },
  ];

  useEffect(() => {
    // console.log('cats', categories);
    let use: iRoute[] = [];
    let cats: iRoute[] = [];
    categories.forEach((c) => cats.push({ color: 'text-primary-400 dark:text-primary-600', name: c.name.toUpperCase(), path: `/shop/${c.name}` }));
    use = [...cats, ...defaultRoutes];
    setroutesToUse(use);
  }, [categories]);

  useEffect(() => {
    // console.log('PATH', router.pathname, router.pathname.includes('admin'), router.pathname.includes('user'));
    if (router.pathname.includes('admin') || router.pathname.includes('user')) {
      setshowSecondsHeaderBar(false);
    } else {
      setshowSecondsHeaderBar(true);
    }
  }, [router.pathname]);

  useEffect(() => {
    // console.log('???', showSecondsHeaderBar);
  }, [showSecondsHeaderBar]);

  useEffect(() => {
    if (currUser) {
      setisLoggedIn(true);
    }
  }, [currUser]);

  useEffect(() => {}, [routesToUse]);

  function BrandingLogo(): JSX.Element {
    return (
      <button className={BRAND_COLORS} onClick={() => router.push('/')}>
        {process.env.NEXT_PUBLIC_COMPANY_NAME}
        {/* <Image src={COMPANY_LOGO} alt={process.env.NEXT_PUBLIC_COMPANY_NAME} width={150} height={50} /> */}
      </button>
    );
  }

  function MobileMenuBtn(): JSX.Element {
    const Seperator: JSX.Element = <hr className='border-primary-200 dark:border-primary-700 ' />;

    return (
      <div className='md:hidden flex mx-4'>
        <div className='relative inline-block '>
          {/* <!-- Dropdown toggle button --> */}
          <button className={`relative z-10 ${MENU_COLORS}`} onClick={() => setshowMenu(!showMenu)}>
            <BsThreeDotsVertical size={26} className='text-black dark:text-white' />
          </button>

          {/* <!-- Dropdown menu --> */}
          {showMenu && (
            <div className='absolute left-0 z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-primary-800'>
              <MenuEntryDropDown
                color='text-black dark:text-white'
                icon={isLoggedIn ? <FaUser size={18} className='text-black dark:text-white' /> : <FaUserLock size={18} className='text-black dark:text-white' />}
                linkUrl={isLoggedIn ? AllRoutes.auth_user_dash.path : AllRoutes.auth.path}
                name={isLoggedIn ? 'Profile' : 'Log In'}
              />
              {Seperator}

              <MenuEntryDropDown
                color='text-black dark:text-white'
                icon={<RiShoppingBasketFill size={24} className='text-black dark:text-white' />}
                linkUrl={AllRoutes.shoppingCart.path}
                name='Shopping Cart'
              />

              {Seperator}

              <MenuEntryDropDown
                color='text-black dark:text-white'
                icon={<IoIosNotifications size={24} className='text-black dark:text-white' />}
                linkUrl={AllRoutes.notify.path}
                name='Notifications'
              />

              {showSecondsHeaderBar &&
                routesToUse.map((r, i) => (
                  <button key={i} className={`m-2 ${r.color}`} onClick={() => router.push(r.path)}>
                    {r.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  function ProfileBtn(): JSX.Element {
    return (
      <button
        type='button'
        className='flex items-center focus:outline-none'
        aria-label='profile btn'
        onClick={() => (isLoggedIn ? router.push(AllRoutes.auth_user_dash.path) : router.push(AllRoutes.auth.path))}
      >
        {isLoggedIn ? (
          <div className='px-2'>
            <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
              <FaUser size={18} className='text-black dark:text-white' />
            </div>
          </div>
        ) : (
          <div className='px-2'>
            <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
              <FaUserLock size={18} className='text-black dark:text-white' />
            </div>
          </div>
        )}
      </button>
    );
  }

  function AdminBtn(): JSX.Element {
    return (
      <button type='button' className='flex items-center focus:outline-none' aria-label='admin btn' onClick={() => router.push(AllRoutes.auth_admin_dash.path)}>
        {currUser && currUser.role !== UserTypes.user && (
          <div className='px-2'>
            <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
              <MdAdminPanelSettings size={24} className='text-black dark:text-white' />
            </div>
          </div>
        )}
      </button>
    );
  }

  // TODO: implement same AS shopping cart button
  function NotifyBtn(): JSX.Element {
    return (
      <button type='button' className='flex items-center focus:outline-none' aria-label='show notifications' onClick={() => console.log('Notification link')}>
        <div className='px-2'>
          <div className='w-8 h-8 flex justify-center content-center items-center overflow-hidden border-2 border-primary-400 rounded-full'>
            <IoIosNotifications size={24} className='text-black dark:text-white' />
          </div>
        </div>
      </button>
    );
  }

  function ShoppingCartBtn(): JSX.Element {
    return <CartPopUp cart={currUser ? currUser.cart : []} />;
  }

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className='hidden md:flex flex-col'>
        <div className='w-full h-16 flex flex-row justify-between content-center  items-center  bg-primary-400 shadow dark:bg-primary-600'>
          {/* Left */}
          <div className='ml-2 lg:ml-10 flex flex-row justify-start content-center items-center'>
            <BrandingLogo />
          </div>

          {/* right */}
          <div className='mr-2 lg:mr-10 flex flex-row justify-end content-center items-center'>
            <ThemeSwitch />
            {currUser && <NotifyBtn />}
            {currUser && <ShoppingCartBtn />}
            {currUser && currUser.role !== UserTypes.user && <AdminBtn />}
            <ProfileBtn />
          </div>
        </div>

        {showSecondsHeaderBar && (
          <div className='w-full h-16 flex flex-row justify-center content-center  items-center  bg-primary-600 shadow dark:bg-primary-400'>
            <div className='mr-2 lg:mr-10 flex flex-row justify-between content-center items-center'>
              {routesToUse.map((x, i) => (
                <button key={i} onClick={() => router.push(x.path)} className={`mx-2 my-2 ${x.color}`}>
                  {x.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE HEADER */}
      <div className='flex md:hidden'>
        <nav className='w-full h-16 flex flex-row justify-between content-center  items-center  bg-white shadow dark:bg-primary-800'>
          {/* Left */}
          <div className='ml-2 lg:ml-16 flex flex-row justify-between content-center items-center'>
            <MobileMenuBtn />
            <BrandingLogo />
          </div>

          {/* right */}
          <div className='mr-2 lg:mr-16 hidden lg:flex flex-row justify-evenly content-center items-center'>
            <ThemeSwitch />

            {currUser && <NotifyBtn />}
            {currUser && <ShoppingCartBtn />}
            {currUser && currUser.role !== UserTypes.user && <AdminBtn />}

            <ProfileBtn />
          </div>
        </nav>
      </div>
    </>
  );
}
