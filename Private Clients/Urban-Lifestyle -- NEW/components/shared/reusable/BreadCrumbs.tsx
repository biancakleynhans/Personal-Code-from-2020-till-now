import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface iProps {
  breadCrumbs: iBreadcrumb[];
}

export interface iBreadcrumb {
  name: string;
  path: string;
}

export default function BreadCrumbs(props: iProps) {
  const { breadCrumbs } = props;
  const router = useRouter();

  useEffect(() => {}, [breadCrumbs]);

  return (
    <div className='flex flex-row justify-start content-center items-center mt-3'>
      {breadCrumbs.map((b, i) =>
        i === breadCrumbs.length - 1 ? (
          <div key={i} className='font-bold text-lg text-slate-800 dark:text-slate-300 mx-1'>
            {b.name}
          </div>
        ) : (
          <button key={i} onClick={() => router.push(b.path)} className='font-light text-lg text-slate-800 dark:text-slate-300 mx-1 cursor-pointer'>
            {b.name} /
          </button>
        )
      )}
    </div>
  );
}
