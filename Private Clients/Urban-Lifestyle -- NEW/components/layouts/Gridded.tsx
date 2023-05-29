import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { iCatSubCat, iSend } from '../../models/Products';
import AddCatSubcatBrand from '../e-comms/admin/AddCatSubcatBrand';

interface iProps {
  header: string;
  typePage: 'brand' | 'category' | 'sub category';
  typeCreate: 'category' | 'subcategory' | 'brand';
  defaultObject: iSend;
  loading: boolean;
  displayArr: iSend[];
  onAdd: (item: iCatSubCat) => void;
  onEdit: (item: iCatSubCat) => void;
  onDelete: (id: string) => void;
}

function displaySingleEntry(index: number, entry: iSend, showEdit: (index: number) => void, dltFnc: (id: string) => void) {
  return (
    <div key={index} className='w-80 lg:w-[500px] flex flex-row justify-between content-center items-center bg-primary-800 rounded shadow shadow-primary-400 my-2 p-3'>
      <img src={entry.images[0]} className='w-[50px] h-[50px]' />
      <div className='flex flex-col justify-between content-center items-center flex-wrap mx-2'>
        <label className='text-xl text-center'>{entry.name}</label>
        <label className='text-base text-center'>{entry.desc}</label>
      </div>

      <div>
        <button onClick={() => showEdit(index)}>
          <FaEdit className='text-orange-400 h-6 w-6 mx-1' />
        </button>
        <button onClick={() => dltFnc(entry.id)}>
          <FaTrash className='text-red-400 h-6 w-6 mx-1' />
        </button>
      </div>
    </div>
  );
}

export default function Grided(props: iProps) {
  const { header, typePage, typeCreate, defaultObject, onAdd, onDelete, onEdit, loading, displayArr } = props;

  const router = useRouter();

  const [addNew, setaddNew] = useState<boolean>(false);
  const [showedit, setshowedit] = useState<boolean[]>([]);

  function editS(index: number) {
    let temp: boolean[] = [];
    showedit.forEach((c, i) => {
      if (i === index) {
        temp.push(!c);
      } else {
        temp.push(c);
      }
    });
    setshowedit(temp);
  }

  function deleteEntry(id: string) {
    // console.log('delete', id);
    let con = confirm('Are you sure you want to delete this brand? This action cannot be undone');
    if (con) {
      onDelete(id);
    }
  }

  useEffect(() => {
    if (displayArr) {
      let temp: boolean[] = [];
      displayArr.forEach((c) => temp.push(false));
      setshowedit(temp);
    }
  }, [displayArr]);

  return (
    <div className='flex flex-col md:flex-row justify-between mx-2 my-10'>
      {/* Buttons */}
      <div className='w-full lg:w-[20%] my-4 text-left flex flex-col'>
        <button onClick={() => router.push('/admin')} className='rounded border-2 border-primary-300 w-[350px] p-2 mb-4'>
          Go back to admin page
        </button>
        <button onClick={() => router.push('/admin/products')} className='rounded border-2 border-primary-300 w-[350px] p-2 mb-4'>
          Go back to product page
        </button>
      </div>

      {/* Main */}
      <div className='w-full lg:w-[72%] flex flex-col justify-between content-center items-center'>
        <h1 className='text-center'>{header}</h1>
        {/* BTNS */}
        <button
          className='text-secondary-400 flex flex-row justify-between content-center items-center text-lg border-2 border-secondary-400 rounded shadow shadow-secondary-200 p-5'
          onClick={() => setaddNew(!addNew)}
        >
          <FaPlusCircle className='px-1 h-6 w-6' /> NEW {typePage.toUpperCase()}
        </button>
        <div>
          {/* Adding */}
          {addNew && (
            <AddCatSubcatBrand
              loading={loading}
              type='add'
              catSubCat={typeCreate}
              default={defaultObject}
              onAdd={(item: iCatSubCat) => {
                onAdd(item);
                setaddNew(!addNew);
              }}
              onUpdate={(item: iCatSubCat) => {}}
              onEditClose={() => {}}
            />
          )}
          {/* Editing */}
          <div>
            {displayArr && displayArr.length > 0 && (
              <div className='mt-4'>
                {displayArr.map((entry, index) => (
                  <div key={index}>
                    {showedit[index] ? (
                      <AddCatSubcatBrand
                        loading={loading}
                        type='edit'
                        catSubCat='brand'
                        default={{ name: entry.name, images: entry.images, id: entry.id, desc: entry?.desc ? entry.desc : '' }}
                        onAdd={(entry: iCatSubCat) => {}}
                        onUpdate={(entry: iCatSubCat) => onEdit(entry)}
                        onEditClose={() => editS(index)}
                      />
                    ) : (
                      displaySingleEntry(
                        index,
                        entry,
                        (i) => editS(i),
                        (i) => deleteEntry(i)
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Loader */}
        {loading && <>LOADING</>}
      </div>
    </div>
  );
}
