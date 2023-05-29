import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Logo from '../../public/assets/images/Logo.jpeg';

interface iProject {
  title: string;
  img: any;
  projectUrl: string;
  type: string;
}

const ProjectList: iProject[] = [
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
  { img: Logo, projectUrl: '/projects/temp', title: 'Placeholder', type: 'String' },
];

function ProjectBlock(project: iProject, index: number): JSX.Element {
  return (
    <div
      key={index}
      className='relative flex items-center justify-center h-auto w-full shadow shadow-gray-800 rounded p-4 group hover:bg-gradient-to-r from-gray-800 to-purple-800'
    >
      <Image className='rounded group-hover:opacity-10' src={project.img} alt='project block' width={300} height={300} />
      {/* Centered container with tailwind  */}
      <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <h3 className='text-2xl text-white tracking-wider text-center'>{project.title}</h3>
        <p className='pb-2 pt-2 text-white text-center'>{project.type}</p>
        <Link href={project.projectUrl}>
          <p className='text-center text-lg text-gray-800 font-bold rounded bg-purple-300 cursor-pointer'>More Info</p>
        </Link>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div id='projects' className='w-full md:h-screen p-2 flex items-center my-16 '>
      <div className='max-w-[1240px] m-auto px-2 py-16 '>
        <p className='uppercase text-xl tracking-widest text-white '>Projects</p>
        <h2 className='py-4'>What I've Built</h2>

        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8 '>{ProjectList.map((project, index) => ProjectBlock(project, index))}</div>
      </div>
    </div>
  );
}
