import React from 'react';

function Error(props: { error: string }) {
  return <label className='text-base text-red-600 dark:text-red-400'>{props.error}</label>;
}

export default Error;
