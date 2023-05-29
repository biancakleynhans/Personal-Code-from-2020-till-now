import React from 'react';

export default function PageHeader(props: { header: string }) {
  return (
    <div className='bg-secondary w-full flex flex-row justify-center content-center items-center' style={{ fontSize: '1.5em' }}>
      {props.header && props.header.toUpperCase()}
    </div>
  );
}
