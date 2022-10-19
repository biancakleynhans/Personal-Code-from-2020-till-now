import React from 'react';
import { faExpandArrowsAlt, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface iProps {
  toggleMap: () => void;
  showMap: boolean;
  styles: string;
}

export default function ViewMapButton(props: iProps) {
  const { showMap, styles, toggleMap } = props;
  return (
    <button className={`text-sm text-mwblue focus:outline-none ${styles}`} onClick={toggleMap}>
      <div className='flex items-center text-base'>
        {showMap ? <span>Close&nbsp;Map</span> : <span>View&nbsp;Map</span>}
        <FontAwesomeIcon icon={showMap ? faCompressArrowsAlt : faExpandArrowsAlt} className='ml-3 h-4' />
      </div>
    </button>
  );
}
