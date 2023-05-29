import React from 'react';

export default function CustomOffline() {
  return (
    <section className='flex items-center h-full p-16 dark:dark:bg-primary-900 dark:dark:text-primary-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl dark:dark:text-primary-600'>
            <span className='sr-only'>Error</span>OFFLINE
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>YOU ARE OFFLINE </p>
          <p className='mt-4 mb-8 dark:dark:text-primary-400'>NO BACK UP CACHE FOUND</p>
        </div>
      </div>
    </section>
  );
}
