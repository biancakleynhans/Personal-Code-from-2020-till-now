import Link from 'next/link';
import React, { useState } from 'react';
import { SocialSection } from '../nav/NavBar';

import { HiOutlineChevronDoubleUp } from 'react-icons/hi';

export default function Contact() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [cell, setcell] = useState('');
  const [subject, setsubject] = useState('');
  const [msg, setmsg] = useState('');

  return (
    <div id='contact' className='w-full md:h-screen p-2 flex items-center my-16 '>
      <div className='max-w-[1240px] w-full m-auto px-2 py-16 '>
        <p className='uppercase text-xl tracking-widest text-white '>Contact</p>
        <h2 className='py-4'>Get in touch</h2>

        <div className='grid lg:grid-cols-5 gap-8'>
          {/* Left */}
          <div className='col-span-3 lg:col-span-2 h-full w-full shadow shadow-gray-600 rounded p-4'>
            {/* image container */}
            <div className='lg:p-4 h-full'>
              <img className='rounded hover:scale-105 ease-in duration-300' src='' alt='contact img' />

              {/* Text section */}
              <div className='mt-5'>
                <h2 className='py-2'>Name here</h2>
                <p>Full stack Dev</p>
                <p className='py-4'>I am avaialble for freelance work </p>
              </div>

              {/* Icons */}
              <div className=''>
                <p className='uppercase pt-8'>Connect with me</p>
                {SocialSection('flex items-center justify-between py-4')}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className='col-span-3 h-full w-full shadow shadow-gray-600 rounded p-4'>
            {/* Form */}
            <div className='p-4'>
              <form>
                <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  {/* Name */}
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2'>Name</label>
                    <input className='border-2 rounded p-3 flex border-gray-400 text-black' type='text' value={name} onChange={(e) => setname(e.target.value)} />
                  </div>

                  {/* Contact Number */}
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2'>Contact Number</label>
                    <input className='border-2 rounded p-3 flex border-gray-400 text-black' type='text' value={cell} onChange={(e) => setcell(e.target.value)} />
                  </div>
                </div>

                {/* Email */}
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Email</label>
                  <input className='border-2 rounded p-3 flex border-gray-400 text-black' type='email' value={email} onChange={(e) => setemail(e.target.value)} />
                </div>

                {/* Subject */}
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Subject</label>
                  <input className='border-2 rounded p-3 flex border-gray-400 text-black' type='text' value={subject} onChange={(e) => setsubject(e.target.value)} />
                </div>

                {/* Message */}
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2'>Message</label>
                  <textarea className='border-2 rounded p-3 border-gray-400 text-black' rows={10} value={msg} onChange={(e) => setmsg(e.target.value)}></textarea>
                </div>

                {/* Btn */}
                <button className='w-full p-4 mt-4 border-2 border-white rounded'>Send Message</button>
              </form>
            </div>
          </div>
        </div>
        {/* Scroll to top btn */}
        <div className='flex justify-center py-12'>
          <Link href='/#home'>
            <div className='rounded-full shadow shadow-purple-800 p-4 cursor-pointer hover:scale-105 ease-in duration-300'>
              <HiOutlineChevronDoubleUp className='m-auto text-purple-800' size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
