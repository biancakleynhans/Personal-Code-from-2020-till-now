import React, { useEffect, useState } from 'react';
import Grided from '../../components/layouts/Gridded';
import { useProductsData } from '../../context/ProductsContext';
import { iCatSubCat, iSend } from '../../models/Products';
import { UploadImageFileAndGetUrl } from '../../firebase/FileUploadToStorage';

const defaultBrand: iSend = {
  id: '',
  images: [],
  name: '',
  desc: '',
};

export default function Brand() {
  const { brands, CreateNew, UpdateEntry, RemoveEntry } = useProductsData();

  const [loading, setloading] = useState(false);

  useEffect(() => {}, [brands]);

  function addNewBrand(brand: iCatSubCat) {
    // console.log('New: ', brand);

    setloading(true);
    // Upload images first
    UploadImageFileAndGetUrl(brand.images.map((x) => x.data)).then((imgs) => {
      // console.log('Imgs', imgs);

      let temp: iSend = { name: brand.name, images: imgs, id: '', desc: brand.desc };

      CreateNew(temp, 'brand')
        .then(() => {
          setloading(false);
        })
        .catch(() => alert('an error occured trying to create a new brand please try again'));
    });
  }

  function updateBrand(brand: iCatSubCat) {
    // console.log('edit', brand);
    setloading(true);
    let newUpload = [];
    let old: string[] = [];
    let t = brand.images.filter((e) => e.data.size === 0);
    old = t.map((e) => e.url);
    newUpload = brand.images.filter((e) => e.data.size > 0).map((x) => x.data);
    // console.log('old', old, 'new', newUpload);

    if (newUpload.length > 0) {
      //   // // Upload images first
      UploadImageFileAndGetUrl(newUpload).then((imgs) => {
        let temp: iSend = { name: brand.name, images: [...old, ...imgs], id: brand.id, desc: brand.desc };
        //   //   console.log('SENDING...', temp);
        UpdateEntry(temp, 'brand').then(() => {
          setloading(false);
        });
      });
    } else {
      let temp: iSend = { name: brand.name, images: [...old], id: brand.id, desc: brand.desc };
      // console.log('SENDING...', temp);
      UpdateEntry(temp, 'brand').then(() => {
        setloading(false);
      });
    }
  }

  function removeBrand(id: string) {
    setloading(true);
    RemoveEntry(id, 'brand');
    setloading(false);
  }

  return (
    <Grided
      header='Brands'
      typePage='brand'
      typeCreate='brand'
      displayArr={brands}
      defaultObject={defaultBrand}
      onAdd={(brand) => addNewBrand(brand)}
      onEdit={(brand) => updateBrand(brand)}
      onDelete={(id) => removeBrand(id)}
      loading={loading}
    />
  );
}
