import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';

// z-[100] Always ontop no matter what

function NavLink(link: string, name: string, handleNav: () => void, color: string): JSX.Element {
  return (
    <Link href={link}>
      <li onClick={() => handleNav()} className='ml-10 text-base uppercase hover:border-b hover:cursor-pointer' style={{ color: `${color}` }}>
        {name}
      </li>
    </Link>
  );
}

function SocialLink(icon: any, link: string) {
  return (
    <a href={link}>
      <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>{icon}</div>
    </a>
  );
}

function SideMenu(nav: boolean, handleNav: () => void, color: string) {
  /* Overlay at back  */

  return (
    <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''}>
      {/* Actual Side Menu */}
      <div
        className={nav ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-slate-700 p-10 ease-in duration-500' : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'}
      >
        {/* Top Sction of side Menu */}
        <div>
          {/* Logo and close btn */}
          <div className='flex w-full items-center justify-between'>
            <Link href='/#home'>
              <Image src='/../../public/assets/Logo.jpeg' alt='Logo home btn' width={87} height={35} />
            </Link>

            {/* Side menu close btn   */}
            <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer' onClick={() => handleNav()}>
              <AiOutlineClose />
            </div>
          </div>
          {/* Slogan  */}
          <div className='border-b border-slate-900 my-4'>
            <p className='w-[85%] md:w-[90%] py-4'>Let's build something legendary together</p>
          </div>
        </div>
        {/* Menu Section */}
        <div className='py-4 flex flex-col'>
          <ul className='uppercase'>
            {NavLink('/#home', 'Home', () => handleNav(), color)}
            {NavLink('/#about', 'About', () => handleNav(), color)}
            {NavLink('/#skills', 'Skills', () => handleNav(), color)}
            {NavLink('/#projects', 'Projects', () => handleNav(), color)}
            {NavLink('/#contact', 'Contact', () => handleNav(), color)}
          </ul>

          {/* Social Media's  */}
          <div className='pt-40'>
            <p className='uppercase tracking-widest text-purple-300'>Let's connect</p>
            {/* Icons */}
            {SocialSection('flex items-center justify-between my-4 w-full sm:w-[80%]')}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar(handleNav: () => void, color: string): JSX.Element {
  return (
    <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
      <Link href='/'>
        <Image src='/../../public/assets/images/Logo.jpeg' alt='Logo home btn' width={125} height={50} />
      </Link>

      {/* Top navbar  */}
      <div>
        {/* Navlinks for md and up */}
        <ul className='hidden md:flex'>
          {NavLink('/#home', 'Home', () => handleNav(), color)}
          {NavLink('/#about', 'About', () => handleNav(), color)}
          {NavLink('/#skills', 'Skills', () => handleNav(), color)}
          {NavLink('/#projects', 'Projects', () => handleNav(), color)}
          {NavLink('/#contact', 'Contact', () => handleNav(), color)}
        </ul>

        {/* Side menu btn for md and down  */}
        <div className='md:hidden' onClick={() => handleNav()}>
          <AiOutlineMenu size={25} />
        </div>
      </div>
    </div>
  );
}

export function SocialSection(csn: string) {
  return (
    <div className={csn}>
      {SocialLink(<FaLinkedinIn />, '')}
      {SocialLink(<FaGithub />, 'https://github.com/biancakleynhans')}
      {SocialLink(<FaWhatsapp />, '')}
      {SocialLink(<AiOutlineMail />, '')}
      {SocialLink(<BsFillPersonLinesFill />, '')}
    </div>
  );
}

export default function NavBar() {
  const [nav, setNav] = useState(false);
  const [shadow, setshadow] = useState(false);
  const [navBg, setNavBg] = useState('#332a38');
  const [linkShade, setlinkShade] = useState('#b6b3b7');

  const router = useRouter();

  // Shadow
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setshadow(!shadow);
      } else {
        setshadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);

  // Nav bg and links
  useEffect(() => {
    // console.log('???', router.asPath, router.asPath.startsWith('/projects'));
    if (router.asPath.startsWith('/projects')) {
      setNavBg('transparent');
      setlinkShade('#000');
    } else {
      setNavBg('#332a38');
      setlinkShade('#b6b3b7');
    }
  }, [router]);

  return (
    <div className={shadow ? 'fixed w-full top-0 h-20 shadow shadow-gray-300 z-[100]' : 'fixed w-full top-0 h-20 z-[100]'} style={{ backgroundColor: `${navBg}` }}>
      {/* Topbar  */}
      {TopBar(() => setNav(!nav), linkShade)}
      {/* Side Bar */}
      {SideMenu(nav, () => setNav(!nav), linkShade)}
    </div>
  );
}
