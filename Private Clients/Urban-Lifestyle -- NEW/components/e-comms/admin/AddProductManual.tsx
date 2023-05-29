import { useEffect, useState } from 'react';
import { useProductsData } from '../../../context/ProductsContext';
import { stringToImgArr } from '../../../helpers/ImageHelpers';
import { ImageArr, iProduct, iProductCreator } from '../../../models/Products';
import ImagesLayout from '../../layouts/ImageLayout';
import CardContainer from '../../shared/reusable/CardContainer';
import InputComponent from '../../shared/reusable/InputComponent';
import SelectComponent from '../../shared/reusable/SelectComponent';
import UploadComponent from '../../shared/reusable/UploadComponent';
import { UploadImageFileAndGetUrl } from '../../../firebase/FileUploadToStorage';

interface iProps {
  loading: boolean;
  type: 'add' | 'edit' | 'uploadAdd';
  defaultObject: iProduct;
  onCreateSingle: (product: iProduct) => void;
  onUpdate: (product: iProduct) => void;
  closeOnComplete: () => void;
  handleFromFile: (prod: iProduct) => void;
}

export default function AddProductManual(props: iProps) {
  const { categories, subcategories, brands } = useProductsData();
  const { defaultObject, loading, onCreateSingle, onUpdate, type, closeOnComplete, handleFromFile } = props;

  const [name, setname] = useState<string>(defaultObject.name);
  const [desc, setdesc] = useState<string>(defaultObject.desc);
  const [size, setsize] = useState<string>(defaultObject.size);
  const [color, setcolor] = useState<string>(defaultObject.color);

  const [priceRaw, setpriceRaw] = useState<number>(defaultObject.priceRaw);
  const [priceSell, setpriceSell] = useState<number>(defaultObject.priceSell);
  const [markupPercentige, setmarkupPercentige] = useState<number>(defaultObject.markupPercentage);
  const [discountPercentige, setdiscountPercentige] = useState<number>(defaultObject.discountPercentage);

  const [quant, setquant] = useState<number>(defaultObject.stock);
  const [cat, setcat] = useState<string>(defaultObject.category);
  const [subCat, setsubCat] = useState<string>(defaultObject.subcategory);
  const [brand, setbrand] = useState<string>(defaultObject.brand);
  const [imgArr, setimgArr] = useState<ImageArr[]>(stringToImgArr(defaultObject.images));

  const [batch, setbatch] = useState<boolean>(false);
  const [batchData, setbatchData] = useState<iProductCreator[]>([]);
  const [disableBtn, setdisableBtn] = useState(false);

  const [isCompleted, setisCompleted] = useState(false);

  useEffect(() => {
    //   console.log('Setting up...', categories, subcategories, brands);
  }, [categories, subcategories, brands]);

  useEffect(() => {
    var calc = (parseFloat(priceRaw?.toString()) * parseFloat(markupPercentige?.toString())) / 100;
    let total = priceRaw + calc;
    // console.log("sell price:", total, " : ", markupPercentige, calc, priceRaw);
    setpriceSell(total);
  }, [markupPercentige, priceRaw]);

  useEffect(() => {}, [name, desc, size, quant, color, markupPercentige, discountPercentige, priceRaw, priceSell, cat, subCat, brand, imgArr]);

  function resetSate() {
    setname('');
    setdesc('');
    setsize('');
    setcolor('');
    setquant(0);
    setcat('');
    setsubCat('');
    setimgArr([]);
    setdiscountPercentige(0);
    setmarkupPercentige(0);
    setpriceRaw(0.0);
    setpriceSell(0.0);
  }

  function complete() {
    // console.log('adding to batch');
    let curr: iProductCreator = {
      name: name,
      desc: desc,
      size: size,
      color: color,
      images: imgArr,
      category: cat,
      subcategory: subCat,
      brand: brand,
      id: defaultObject.id,
      rating: 5,
      priceRaw: priceRaw,
      priceSell: priceSell,
      markupPercentage: markupPercentige,
      discountPercentage: discountPercentige,
      stock: quant,
    };
    let new_batch = [...batchData];
    new_batch.push(curr);
    setbatchData(new_batch);
    resetSate();
  }

  function handleDone() {
    // console.log('save single to db now');
    let curr: iProduct = {
      name: name,
      desc: desc,
      size: size,
      color: color,
      images: [],
      category: cat,
      subcategory: subCat,
      brand: brand,
      id: defaultObject.id,
      rating: 5,
      priceRaw: priceRaw,
      priceSell: priceSell,
      markupPercentage: markupPercentige,
      discountPercentage: discountPercentige,
      stock: quant,
      dateCreated: new Date(),
      isOnSale: false,
    };

    // Add single new product
    if (type === 'add') {
      // console.log('add new product', curr);
      if (imgArr.length > 0) {
        UploadImageFileAndGetUrl(imgArr.map((x) => x.data))
          .then((res) => {
            // console.log('imgs arr', res);
            curr.images = res;
            onUpdate(curr);
            resetSate();
            closeOnComplete();
          })
          .catch((err) => console.error('error occured in uploading images'));
      } else {
        onUpdate(curr);
        resetSate();
        closeOnComplete();
      }
    }
    // from the file upload component
    else if (type === 'uploadAdd') {
      // console.log('here we need more logic ');
      if (imgArr.length > 0) {
        UploadImageFileAndGetUrl(imgArr.map((x) => x.data))
          .then((res) => {
            // console.log('imgs arr', res);
            curr.images = res;
            handleFromFile(curr);
            setisCompleted(true);
          })
          .catch((err) => console.error('error occured in uploading images'));
      } else {
        handleFromFile(curr);
        setisCompleted(true);
      }
    }
    //   edit single product
    else {
      // console.log('edit product');
      if (imgArr.length > 0 && imgArr.length > defaultObject.images.length) {
        UploadImageFileAndGetUrl(imgArr.map((x) => x.data))
          .then((res) => {
            // console.log('imgs arr', res);
            curr.images = res;
            onCreateSingle(curr);
            resetSate();
            closeOnComplete();
          })
          .catch((err) => console.error('error occured in uploading images'));
      } else {
        onCreateSingle(curr);
        resetSate();
        closeOnComplete();
      }
    }
  }

  function completeBatched() {
    setdisableBtn(true);
    Promise.all(
      batchData.map((prod) => {
        let temp: iProduct = {
          brand: prod.brand,
          category: prod.category,
          color: prod.color,
          desc: prod.desc,
          discountPercentage: prod.discountPercentage,
          id: prod.id,
          images: [],
          markupPercentage: prod.markupPercentage,
          priceRaw: prod.priceRaw,
          priceSell: prod.priceSell,
          rating: prod.rating,
          size: prod.size,
          stock: prod.stock,
          subcategory: prod.subcategory,
          name: prod.name,
          dateCreated: new Date(),
          isOnSale: false,
        };

        return new Promise<iProduct>((resolve, reject) => {
          if (imgArr.length > 0) {
            UploadImageFileAndGetUrl(prod.images.map((x) => x.data))
              .then((imgs) => {
                temp.images = imgs;
                resolve(temp);
              })
              .catch((err) => {
                // console.log('ERROR IMG UPLOAD', err);
                reject(err);
              });
          } else {
            resolve(temp);
          }
        });
      })
    ).then((products) => {
      // console.log('Uploaded', products);

      Promise.all(
        products.map((prod) => {
          return new Promise<void>((resolve, reject) => {
            onCreateSingle(prod);
            resolve();
          });
        })
      ).then(() => {
        closeOnComplete();
        setdisableBtn(false);
      });
    });
  }

  // IMAGES for PRODUCT
  function handle_upload(e: any) {
    let tempArr: any[] = [];
    [...e].forEach((file) => {
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file),
      });
    });
    // console.log("pictures >> ", tempArr);
    setimgArr([...imgArr, ...tempArr]);
  }

  //   Images remove
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
    <>
      {!isCompleted && (
        <CardContainer isDark={true} width='w-full' title subtitle>
          {loading && <h2>Saving product(s) to DB</h2>}
          {type === 'add' && (
            <div className='flex flex-row justify-between content-center items-center'>
              <h3 className='text-lg'>Would you like to batch tranctions or single items at a time ? </h3>
              <div className='flex flex-row justify-center my-1'>
                <button className={`rounded mx-2 p-2 border-2 ${batch ? 'border-secondary-400 text-secondary-400' : 'border-none'}`} onClick={() => setbatch(true)}>
                  Batched
                </button>
                <button className={`rounded mx-2 p-2 border-2 ${!batch ? 'border-secondary-400 text-secondary-400' : 'border-none'}`} onClick={() => setbatch(false)}>
                  Single
                </button>
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
            {/* NAME */}
            <InputComponent handleChange={(e) => setname(e)} inputValue={name} labelText={'Product name *'} placeholder={'Product name'} type='text' />

            {/* DESC */}
            <InputComponent handleChange={(e) => setdesc(e)} inputValue={desc} labelText={'Product description *'} placeholder={'Product description'} type='text' />

            {/* Color */}
            <InputComponent
              handleChange={(e) => setcolor(e)}
              inputValue={color}
              labelText={'Colors * Please write all options separated by comma (,)'}
              placeholder={'Product colors'}
              type='text'
            />

            {/* SIZE */}
            <InputComponent
              handleChange={(e) => setsize(e)}
              inputValue={size}
              labelText={'Sizes * Please write all options separated by comma (,)'}
              placeholder={'Product sizes'}
              type='text'
            />

            {/* Price Markup*/}
            <InputComponent
              handleChange={(e) => setmarkupPercentige(Number(e))}
              inputValue={markupPercentige?.toString()}
              labelText={'Markup Percentige (Added to cost price of Product)*'}
              placeholder={'0.00'}
              type='number'
            />

            {/* Price Discount*/}
            <InputComponent
              handleChange={(e) => setdiscountPercentige(Number(e))}
              inputValue={discountPercentige?.toString()}
              labelText={'Discount Percentige * (When on sale calulated on total item price) *'}
              placeholder={'0.00'}
              type='number'
            />

            {/* Price Raw*/}
            <InputComponent handleChange={(e) => setpriceRaw(Number(e))} inputValue={priceRaw?.toString()} labelText={'Cost price per unit *'} placeholder={'0.00'} type='number' />

            {/* Price Sell*/}
            <InputComponent
              handleChange={(e) => setpriceSell(Number(e))}
              inputValue={priceSell?.toString()}
              labelText={'Selling price per unit * (Auto calulated but can be adjusted)'}
              placeholder={'0.00'}
              type='number'
            />

            {/* Quantity */}
            <InputComponent
              handleChange={(e) => setquant(Number(e))}
              inputValue={quant?.toString()}
              labelText={'Quantity of product available *'}
              placeholder={'0'}
              type='number'
            />

            {/* Brand */}
            <SelectComponent
              handleChange={(e) => setbrand(e)}
              inputValueMulti={[]}
              inputValueString={brand}
              isMulti={false}
              labelText={'Brand *'}
              options={brands.map((x) => ({ disabled: false, label: x.name, value: x.id }))}
              placeholder={''}
              type='string'
            />

            {/* Cat */}
            <SelectComponent
              handleChange={(e) => setcat(e)}
              inputValueMulti={[]}
              inputValueString={cat}
              isMulti={false}
              labelText={'Category *'}
              options={categories.map((x) => ({ disabled: false, label: x.name, value: x.id }))}
              placeholder={''}
              type='string'
            />

            {/* SubCat */}
            <SelectComponent
              handleChange={(e) => setsubCat(e)}
              inputValueMulti={[]}
              inputValueString={subCat}
              isMulti={false}
              labelText={'Sub Category *'}
              options={subcategories.map((x) => ({ disabled: false, label: x.name, value: x.id }))}
              placeholder={''}
              type='string'
            />
          </div>

          {/* IMAGES  */}
          <div className='flex flex-col justify-center content-center items-center mt-2'>
            <label className='my-1'>Images *</label>
            <UploadComponent handleChange={(e) => handle_upload(e)} labelText='' />
          </div>

          {imgArr.length > 0 && <ImagesLayout remove={(index: number) => removeImageFromArr(index)} imgArr={imgArr} />}

          {/* Submit buttons */}
          <div className='flex flex-row justify-center w-full'>
            <button className='border-2 border-primary-500 rounded p-3 my-4' onClick={() => (batch ? complete() : handleDone())}>
              {batch ? 'Add to batch' : type === 'uploadAdd' ? 'Add to completed Completed' : 'Upload'}
            </button>

            {batch && batchData.length > 0 && (
              <button disabled={disableBtn} className='border-2 border-primary-500 rounded p-3 my-4' onClick={() => completeBatched()}>
                Upload batch data
              </button>
            )}
          </div>
        </CardContainer>
      )}
    </>
  );
}
