import React from 'react';
import { SocialSection } from '../nav/NavBar';

export default function HomeHero() {
  return (
    <div id='home' className='w-full h-screen text-center'>
      <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center'>
        {/* Content  container */}
        <div className='text-gray-200'>
          <p className='uppercase text-sm tracking-widest '> LET'S BUILD SOMETHING TOGETHER</p>
          <h1 className='py-4 '>
            Hi, I'm <span className='text-purple-400'> Bianca</span>
          </h1>
          <h1 className='py-2 '>A Full-Stack Web Developer</h1>
          <p className='py-4  max-w-[70%] m-auto'>
            I'm a full-stack web developer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building responsive
            front-end web applications while learning new technologies.
          </p>
          {SocialSection('flex items-center justify-between max-w-[330px] m-auto py-4')}
        </div>
      </div>
    </div>
  );
}
