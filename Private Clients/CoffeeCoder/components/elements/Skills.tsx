import Image from 'next/image';
import React from 'react';

import CSS from '../../public/assets/skills/css.png';
import FIREB from '../../public/assets/skills/firebase.png';
import GITH from '../../public/assets/skills/github.png';
import HTM from '../../public/assets/skills/html.png';
import JS from '../../public/assets/skills/javascript.png';
import NEXT from '../../public/assets/skills/nextjs.png';
import NOD from '../../public/assets/skills/node.png';
import RE from '../../public/assets/skills/react.png';
import TAIL from '../../public/assets/skills/tailwind.png';

const ImagesArr = [
  { img: CSS, name: 'CSS' },
  { img: FIREB, name: 'FIREBASE' },
  { img: GITH, name: 'GITHUB' },
  { img: HTM, name: 'HTML' },
  { img: JS, name: 'JAVASCRIPT' },
  { img: NEXT, name: 'NEXT.JS' },
  { img: NOD, name: 'NODE.JS' },
  { img: RE, name: 'REACT' },
  { img: TAIL, name: 'TAILWIND' },
];

function SkillCard(imgSrc: any, imgName: string, index: number): JSX.Element {
  return (
    <div key={index} className='p-6 rounded shadow hover:scale-105 ease-in duration-300'>
      <div className='grid grid-cols-2 gap-4 justify-center items-center'>
        <div className='m-auto'>
          <Image src={imgSrc} alt='Skill Image' width={64} height={64} />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h3>{imgName}</h3>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div id='skills' className='w-full md:h-screen p-2 flex items-center my-16 '>
      <div className='max-w-[1240px] m-auto flex flex-col justify-center'>
        <p className='uppercase text-xl tracking-widest text-white'>Skills</p>
        <h2 className='py-4'>What I can Do</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>{ImagesArr.map((entry, index) => SkillCard(entry.img, entry.name, index))}</div>
      </div>
    </div>
  );
}
