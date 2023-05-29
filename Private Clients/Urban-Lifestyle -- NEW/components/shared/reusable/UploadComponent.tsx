import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF', 'XLSX', 'WEBP', 'DOCX', 'DOC', 'MP4'];

interface iProps {
  labelText: string;
  handleChange: (val: any) => void;
}

export default function UploadComponent(props: iProps) {
  const { handleChange, labelText } = props;

  return (
    <div className='flex flex-col items-center'>
      <label className='text-lg text-primary-700 dark:text-primary-100 my-2 mx-2'>{labelText}</label>
      <FileUploader multiple={true} handleChange={(e: any) => handleChange(e)} name='file' types={fileTypes} />
    </div>
  );
}
