import { saveAs } from 'file-saver';
import { isArrayOfStrings } from '../../../utils/Helpers';
import { FaFileDownload, FaFileImage } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

function runDownloadFile(file: string, fName: string) {
  saveAs(file, fName);
}

export interface iContentEntry {
  [k: string]: { type: string; content: string[] | string }[];
}

interface iProps {
  type: 'fileUrlsUser' | 'fileUrlsAdmin';
  data: iContentEntry[];
  color: string;
}

export default function DownloadListComponent(props: iProps) {
  const { color, data, type } = props;

  const [allLiks, setallLiks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    createLinks();
  }, [data]);

  function createLinks() {
    let links: JSX.Element[] = [];

    data.map((entry) => {
      // // console.log("ENTRY", Object.values(entry));
      Object.values(entry).map((line) => {
        // // console.log("LINE", line);
        line.map((val, index) => {
          // // console.log('VAL', val);
          if (val.type === type) {
            if (isArrayOfStrings(val.content)) {
              val.content.map((v) => {
                // // console.log('V', v);
                let v1 = v
                  .replace(process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : '', '')
                  .replaceAll('%20', ' ')
                  .replaceAll('%26', ' ');
                let vName = v1.slice(0, v1.indexOf('?alt'));
                links.push(
                  <div className='mt-2 w-full flex flex-row justify-between content-between items-center border-2 border-primary-200 rounded p-2' key={index} color={color}>
                    <button
                      onClick={() => {
                        runDownloadFile(v, vName);
                      }}
                    >
                      <FaFileDownload color='primary' size={18} className='mx-2' />
                    </button>

                    <label>{v.slice(0, 35)} ...</label>

                    <img
                      src={v}
                      alt='broken'
                      width={50}
                      height={50}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/fileType.png';
                        // console.log('????', e.currentTarget.src);
                      }}
                    />
                  </div>
                );
              });
            }
          }
        });
      });
    });

    // // console.log('links', links);
    setallLiks(links);
  }

  return (
    <>
      {allLiks.map((xx, i) => (
        <React.Fragment key={i}>{xx}</React.Fragment>
      ))}
    </>
  );
}
