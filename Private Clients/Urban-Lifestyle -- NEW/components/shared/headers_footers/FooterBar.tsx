import React from 'react';

import { AiOutlineWhatsApp } from 'react-icons/ai';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { fbLink, FooterText, ghLink, waLink } from '../../../constants/AppConstants';

export default function FooterBar() {
  return (
    <footer className='sticky bottom-0 w-full flex flex-col items-center justify-between px-6 py-4 bg-white dark:bg-primary-800 sm:flex-row'>
      <p className='py-2 text-primary-800 dark:text-white sm:py-0'>{FooterText}</p>

      <div className='flex mx-2 text-xl'>
        <a href={waLink} className='mx-2 text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300' aria-label='Whatsapp'>
          <AiOutlineWhatsApp />
        </a>

        <a href={fbLink} className='mx-2 text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-300' aria-label='Facebook'>
          <FaFacebook />
        </a>

        <a href={ghLink} className='mx-2 text-primary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-300' aria-label='Github'>
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
