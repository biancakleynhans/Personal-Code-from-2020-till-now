import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { RiRadioButtonFill } from 'react-icons/ri';

import Banner from '../../public/assets/images/Logo.jpeg';

const techStack = ['React', 'Typescript', 'Firebase'];

function TechEntry(entry: string, index: number) {
  return (
    <p key={index} className='flex items-center text-gray-100 py-2 '>
      <RiRadioButtonFill className='mr-1' />
      {entry}
    </p>
  );
}

export default function Temp() {
  return (
    <div className='w-full'>
      {/* Banner with image and description title */}
      <div className='w-full h-[30vh] lg:h-[40vh] relative'>
        {/* overlay image */}
        <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black opacity-10 z-10' />
        <Image className='absolute z-1' layout='fill' objectFit='cover' src={Banner} alt='banner image' />

        {/* Text on top of image */}
        <div className='absolute top-[70%] max-h-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] z-10 p-2'>
          <h2 className='ml-2 lg:ml-12'>Project Name</h2> <h3 className='ml-2 lg:ml-12'>Project tech stack</h3>
        </div>
      </div>

      {/* Content  */}
      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        {/* Left */}
        <div className='col-span-4'>
          <p>Project</p>
          <h2>Overview</h2>
          <p>text about project</p>
          <button className='px-4 py-2 mt-4 mr-8 border border-white rounded '>Demo</button>
          <button className='px-4 py-2 mt-4 border border-white rounded '>Code</button>
        </div>

        {/* Right */}
        <div className='col-span-4 md:col-span-1 shadow shadow-gray-400 rounded p-4'>
          <p className='font-bold text-left underline uppercase pb-2'>Tech Stack used: </p>
          <div className='grid grid-cols-3 md:grid-cols-1'>{techStack.map((entry, index) => TechEntry(entry, index))}</div>
        </div>

        {/* Back btn */}
        <Link href='/#projects'>
          <p className='underline cursor-pointer'>Back</p>
        </Link>
        
      </div>
    </div>
  );
}
