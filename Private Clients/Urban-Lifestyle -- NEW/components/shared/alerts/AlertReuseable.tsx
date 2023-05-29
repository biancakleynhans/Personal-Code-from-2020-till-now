import React from 'react';

interface iProps {
  showAlert: boolean;
  alertText: string;
  onHandle: () => void;
  styling: string;
}

export default function AlertReuseable(props: iProps) {
  return (
    <div className={props.showAlert ? 'relative' : 'hidden'}>
      <div x-transition className='z-50 bg-black bg-opacity-25 fixed top-0 left-0 w-full h-full flex items-center justify-center px-4 py-5'>
        <div className='w-[200px] rounded bg-primary-500 p-5 text-center '>
          <h1 className='text-base text-body-color leading-relaxed mb-10'>{props.alertText}</h1>
          <button className={props.styling} onClick={() => props.onHandle()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
