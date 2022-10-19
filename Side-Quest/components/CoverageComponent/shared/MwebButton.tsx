import React from 'react';
import styles from '../styles/MwebButton.module.css';

interface iProps {
  variant: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  id: string;
  containerStyle: string;
  addedStyle: string;
  padding: string;
  click: () => void;
  disabled: boolean;
  children: any;
}

export default function MwebButton(props: iProps) {
  const { addedStyle, children, click, containerStyle, disabled, id, padding, type, variant } = props;

  const outerStyle =
    variant === 'orange'
      ? `${styles.BoxShadowOrange} filter drop-shadow-md bg-gradient-to-r from-mworange-ctal to-mworange-ctar border-0 text-white transition duration-1000 hover:bg-mworange-l`
      : variant === 'vuma' || variant === 'darkorange'
      ? `${styles.BoxShadowOrange} bg-gradient-to-r from-mwvumareach to-mwvumareach-l text-white transition duration-1000 hover:bg-mwvumareach-l`
      : variant === 'blue' || variant === 'blueSelect'
      ? `bg-white text-mwblue border border-mwblue`
      : variant === 'blueInv' || variant === 'blueSelectInv'
      ? `bg-mwblue text-white border border-mwblue`
      : variant === 'invHoverUnderline'
      ? `bg-white text-mwblue border border-mwblue`
      : '';

  const innerStyle =
    variant === 'orange'
      ? 'transition duration-1000 hover:bg-mworange-l'
      : variant === 'vuma' || variant === 'darkorange'
      ? 'transition duration-1000 hover:bg-mwvumareach-l'
      : variant === 'blue'
      ? 'flex justify-center justify-items-center transition duration-200 hover:bg-mwblue hover:text-white'
      : variant === 'blueInv'
      ? 'rounded-lg transition duration-200 hover:text-white'
      : variant === 'blueSelect'
      ? 'flex justify-center justify-items-center transition duration-200 hover:bg-mwblue hover:text-white py-1 px-2'
      : variant === 'blueSelectInv'
      ? 'transition duration-200 hover:bg-white hover:text-mwblue py-1 px-2'
      : variant === 'invHoverUnderline'
      ? `hover:underline`
      : '';

  return (
    <div className={`flex flex-col justify-between content-center items-center border-2 border-white  ${containerStyle}`}>
      <button type={type} id={id} name='btn-check-coverage' className={`${outerStyle} text-sm focus:outline-none ${addedStyle} `} onClick={() => click?.()} disabled={disabled}>
        <div className={`flex flex-col justify-center content-center items-center  ${innerStyle} ${padding} h-full`}>{children}</div>
      </button>
    </div>
  );
}
