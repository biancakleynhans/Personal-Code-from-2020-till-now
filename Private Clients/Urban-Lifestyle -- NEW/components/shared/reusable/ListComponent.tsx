import React, { useEffect } from 'react';

interface iProps {
  title: string;
  subtitle: string;
  hasheader: boolean;
  children: any;
}

export const ListChild = (props: iProps) => {
  const { children, hasheader, subtitle, title } = props;
  return (
    <li className='my-2'>
      {/* Header */}
      <div className=''>
        {hasheader && (
          <div className=''>
            {title && title.length > 0 && <h3 className='text-lg leading-6 font-medium text-primary-900 dark:text-white'>{title}</h3>}
            {subtitle && subtitle.length > 0 && <p className='mt-1 max-w-2xl text-sm text-primary-500 dark:text-primary-200'>{subtitle}</p>}
          </div>
        )}
      </div>
      {/* Children */}
      <div className='my-2'>{children}</div>
    </li>
  );
};

export default function ListComponent(props: iProps) {
  const { title, subtitle, hasheader, children } = props;

  useEffect(() => {}, [children, title, subtitle, hasheader]);

  return (
    <div className='bg-white dark:bg-primary-800'>
      {/* Header */}
      {hasheader && (
        <div className='px-2 py-2 w-full my-2'>
          {title && title.length > 0 && <h3 className='text-lg leading-6 font-medium text-primary-900 dark:text-white'>{title}</h3>}
          {subtitle && subtitle.length > 0 && <p className='text-base text-primary-500 dark:text-primary-200'>{subtitle}</p>}
        </div>
      )}

      {/* Children of the list */}
      <ul className=''>{children}</ul>
    </div>
  );
}
