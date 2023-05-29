/* 
  Server side rendering error page
  THIS IS A CUSTOM PAGE THAT WILL REPLACE THE STANDARD ONE THAT IS SHIPPED WITH THE TEMPLATE
*/

import { useRouter } from 'next/router';

export default function Custom500() {
  const router = useRouter();
  return (
    <section className='flex items-center h-full p-16 dark:dark:bg-primary-900 dark:dark:text-primary-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl dark:dark:text-primary-600'>
            <span className='sr-only'>Error</span>500
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>Sorry, we couldn&apos;t find this page.</p>
          <p className='mt-4 mb-8 dark:dark:text-primary-400'>But dont worry, you can find plenty of other things on our homepage.</p>
          <button onClick={() => router.push('/')} className='px-8 py-3 font-semibold rounded dark:dark:bg-violet-400 dark:dark:text-primary-900'>
            Back to homepage
          </button>
        </div>
      </div>
    </section>
  );
}
