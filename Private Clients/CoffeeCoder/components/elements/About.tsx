import Image from 'next/image';
import React from 'react';

export default function About() {
  return (
    <div id='about' className='w-full md:h-screen p-2 flex items-center my-16 '>
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-white '>About</p>
          <h2 className='py-4'>Who am I</h2>
          <p className='py-2 text-gray-300'>Give a little info about self</p>
          <p className='py-2 text-gray-300 underline cursor-pointer'>Check out some of my projects.</p>
        </div>
        <div className='w-full h-auto m-auto shadow-xl rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
          <Image className='rounded-xl' src='/../../public/assets/images/Logo.jpeg' alt='image for about' width={250} height={250} />
        </div>
      </div>
    </div>
  );
}
