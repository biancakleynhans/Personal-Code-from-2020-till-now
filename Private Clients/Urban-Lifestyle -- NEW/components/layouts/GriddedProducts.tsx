import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { iProduct } from '../../models/Products';
import AddProductFromFile from '../e-comms/admin/AddProductFromFile';
import AddProductManual from '../e-comms/admin/AddProductManual';

interface iProps {
  header: string;
  defaultObject: iProduct;
  displayArr: iProduct[];
  onAdd: (item: iProduct) => void;
  onEdit: (item: iProduct) => void;
  onDelete: (id: string) => void;
}

function displaySingleEntry(index: number, entry: iProduct, showEdit: (index: number) => void, dltFnc: (id: string) => void) {
  return (
    <div key={index} className='w-auto  lg:w-[500px] flex flex-row justify-between content-center items-center bg-primary-800 rounded shadow shadow-primary-400 my-2 p-3'>
      <img src={entry.images[0]} className='w-[50px] h-[50px]' />

      <div className='flex flex-col justify-start ml-10 w-[70%]'>
        <label className='text-lg'>Name: {entry.name}</label>
        <label className='text-lg'>Stock Level: {entry.stock}</label>
        <label className='text-lg'>Sell Price: R{entry.priceSell}</label>
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

export default function GridedProducts(props: iProps) {
  const { header, defaultObject, onAdd, onDelete, onEdit, displayArr } = props;

  const router = useRouter();

  const [selected, setselected] = useState<'none' | 'manual' | 'file'>('none');
  const [showedit, setshowedit] = useState<boolean[]>([]);
  const [loading, setloading] = useState(false);
  const [showProducts, setshowProducts] = useState(true);

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
    <>
      <h1 className='text-center'>{header}</h1>
      <div className='flex flex-col md:flex-row justify-between mx-2 my-10'>
        {/* Buttons */}
        <div className='w-full lg:w-[23.5%] my-4 text-left flex flex-col'>
          <button onClick={() => router.push('/admin')} className='rounded border-2 border-primary-300 w-[350px] p-2 mb-4'>
            Go back to admin page
          </button>
          <button onClick={() => router.push('/admin/products')} className='rounded border-2 border-primary-300 w-[350px] p-2 mb-4'>
            Go back to product page
          </button>

          {/* BTNS For type of upload process*/}
          <div className='flex flex-row justify-between text-center my-2'>
            <button
              className='mr-2 text-secondary-400 text-center text-base border-2 border-secondary-400 rounded shadow shadow-secondary-200 p-5'
              onClick={() => setselected('manual')}
            >
              Create Product(s) Manually
            </button>
            <button
              className='mx-2 text-secondary-400 text-center text-base border-2 border-secondary-400 rounded shadow shadow-secondary-200 p-5'
              onClick={() => setselected('file')}
            >
              Create Product(s) from Excel File
            </button>
          </div>
        </div>

        {/* Main */}
        <div className='w-full lg:w-[72%] flex flex-col justify-between content-center items-center'>
          {/* Adding */}
          {selected === 'manual' && (
            <AddProductManual
              defaultObject={defaultObject}
              type='add'
              onCreateSingle={(item) => onAdd(item)}
              onUpdate={() => {}}
              handleFromFile={() => {}}
              loading={loading}
              closeOnComplete={() => setselected('none')}
            />
          )}
          {selected === 'file' && <AddProductFromFile handleComplete={(item) => onAdd(item)} />}

          {/* Editing */}
          {displayArr && (
            <div className='mt-4'>
              <button className='my-2 text-2xl font-serif text-center w-full' onClick={() => setshowProducts(!showProducts)}>
                {showProducts ? 'Hide' : 'Show'} All Products
              </button>
              {showProducts &&
                displayArr.map((entry, index) => (
                  <div key={index}>
                    {showedit[index] ? (
                      <AddProductManual
                        defaultObject={entry}
                        type='edit'
                        closeOnComplete={() => editS(index)}
                        handleFromFile={() => {}}
                        loading={loading}
                        onCreateSingle={(prod) => onEdit(prod)}
                        onUpdate={() => {}}
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
    </>
  );
}
