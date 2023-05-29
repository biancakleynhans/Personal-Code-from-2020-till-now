import { useEffect, useState } from 'react';
import { iCatSubCat, ImageArr, iSend } from '../../../models/Products';
import ImagesLayout from '../../layouts/ImageLayout';
import CardContainer from '../../shared/reusable/CardContainer';
import InputComponent from '../../shared/reusable/InputComponent';
import UploadComponent from '../../shared/reusable/UploadComponent';

interface iProps {
  type: 'add' | 'edit';
  catSubCat: 'category' | 'subcategory' | 'brand';
  default: iSend;
  loading: boolean;
  onAdd: (cat: iCatSubCat) => void;
  onUpdate: (cat: iCatSubCat) => void;
  onEditClose: () => void;
}

export default function AddCatSubcatBrand(props: iProps) {
  const [imgArr, setimgArr] = useState<ImageArr[]>(props.default.images.map((x) => ({ data: new File([new Blob()], ''), url: x })));
  const [name, setname] = useState<string>(props.default.name);
  const [desc, setdesc] = useState<string>(props.default.desc);

  useEffect(() => {}, [imgArr]);

  // IMAGES
  function handle_upload(e: any) {
    // console.log('E', e);
    let tempArr: any[] = [];

    [...e].forEach((file) => {
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file),
      });
    });
    // console.log('pictures >> ', tempArr);
    setimgArr([...imgArr, ...tempArr]);
  }

  function removeImageFromArr(index: number) {
    let tempArr: any[] = [];
    [...imgArr].forEach((entry, i) => {
      if (index !== i) {
        tempArr.push(entry);
      }
    });
    // console.log("pictures >> ", tempArr);
    setimgArr(tempArr);
  }

  return (
    <CardContainer isDark={true} width='w-full' title={`${props.type.toUpperCase()} ${props.catSubCat.toUpperCase()}`} subtitle>
      {/* Name */}
      <InputComponent handleChange={(e) => setname(e)} inputValue={name} labelText='NAME *' placeholder={'Name'} type='text' />

      {/* Desc */}
      <InputComponent handleChange={(e) => setdesc(e)} inputValue={desc} labelText='DESCRIPTION *' placeholder={'description'} type='text' />

      {/* IMAGES  */}
      <UploadComponent handleChange={(e) => handle_upload(e)} labelText='' />

      {imgArr.length > 0 && <ImagesLayout remove={(index: number) => removeImageFromArr(index)} imgArr={imgArr} />}

      {/* Btns */}
      <div className='flex flex-col justify-center content-center items-center mt-4'>
        {props.type === 'add' && (
          <button
            className='border-2 rounded p-3 text-lg text-center'
            disabled={name.length === 0 || imgArr.length === 0 || props.loading ? true : false}
            onClick={() => props.onAdd({ name, images: imgArr, id: props.default.id, desc: desc })}
          >
            {props.type.toUpperCase()} {props.catSubCat.toUpperCase()}
          </button>
        )}

        {props.type === 'edit' && (
          <div>
            <button
              className='border-2 rounded p-3 text-lg text-center'
              disabled={name.length === 0 || imgArr.length === 0 || props.loading ? true : false}
              onClick={() => {
                props.onUpdate({ name, images: imgArr, id: props.default.id, desc: desc });
                props.onEditClose();
              }}
            >
              {props.type.toUpperCase()} {props.catSubCat.toUpperCase()}
            </button>
            <button className='border-2 rounded p-3 text-lg text-center mx-2' onClick={() => props.onEditClose()}>
              CANCEL
            </button>
          </div>
        )}
      </div>
    </CardContainer>
  );
}
