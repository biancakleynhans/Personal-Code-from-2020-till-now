import React, { useEffect } from 'react';

interface iProps {
  children: any;
  title: any;
  subtitle: any;
  width: string;
  isDark: boolean;
}

export default function CardContainer(props: iProps) {
  const { children, subtitle, title, width, isDark } = props;

  useEffect(() => {}, [children, title, subtitle]);

  return (
    <div className={`${width} flex flex-col rounded shadow ${isDark ? 'bg-primary-600 text-primary-300' : 'bg-primary-400 text-primary-800'} my-4 py-3 px-3`}>
      {title !== null && <h1 className='text-center w-full'> {title}</h1>}
      {subtitle !== null && <h2 className='text-center w-full'>{subtitle}</h2>}
      <div className='text-left'>{children}</div>
    </div>
  );
}
