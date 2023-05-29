import React, { useEffect, useState } from 'react';
import Grided from '../../components/layouts/Gridded';
import { useProductsData } from '../../context/ProductsContext';
import { UploadImageFileAndGetUrl } from '../../firebase/FileUploadToStorage';
import { iCatSubCat, iSend } from '../../models/Products';

const defaultSubCategory: iSend = {
  id: '',
  images: [],
  name: '',
  desc: '',
};

export default function SubCategory() {
  const { subcategories, CreateNew, UpdateEntry, RemoveEntry } = useProductsData();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log('subcategories', subcategories);
  }, [subcategories]);

  function addNewSubcategory(Subcategory: iCatSubCat) {
    // console.log('New: ', Subcategory);

    setloading(true);
    // Upload images first
    UploadImageFileAndGetUrl(Subcategory.images.map((x) => x.data)).then((imgs) => {
      // console.log('Imgs', imgs);

      let temp: iSend = { name: Subcategory.name, images: imgs, id: '', desc: Subcategory.desc };

      CreateNew(temp, 'subcategory')
        .then(() => {
          setloading(false);
        })
        .catch(() => alert('an error occured trying to create a new Subcategory please try again'));
    });
  }

  function updateSubcategory(Subcategory: iCatSubCat) {
    // console.log('edit', Subcategory);
    setloading(true);
    let newUpload = [];
    let old: string[] = [];
    let t = Subcategory.images.filter((e) => e.data.size === 0);
    old = t.map((e) => e.url);
    newUpload = Subcategory.images.filter((e) => e.data.size > 0).map((x) => x.data);
    // console.log('old', old, 'new', newUpload);

    if (newUpload.length > 0) {
      //   // // Upload images first
      UploadImageFileAndGetUrl(newUpload).then((imgs) => {
        let temp: iSend = { name: Subcategory.name, images: [...old, ...imgs], id: Subcategory.id, desc: Subcategory.desc };
        //   //   console.log('SENDING...', temp);
        UpdateEntry(temp, 'subcategory').then(() => {
          setloading(false);
        });
      });
    } else {
      let temp: iSend = { name: Subcategory.name, images: [...old], id: Subcategory.id, desc: Subcategory.desc };
      // console.log('SENDING...', temp);
      UpdateEntry(temp, 'subcategory').then(() => {
        setloading(false);
      });
    }
  }

  function removeSubcategory(id: string) {
    setloading(true);
    RemoveEntry(id, 'subcategory');
    setloading(false);
  }

  return (
    <Grided
      header='Sub Categories'
      typePage='sub category'
      typeCreate='subcategory'
      displayArr={subcategories}
      defaultObject={defaultSubCategory}
      onAdd={(Subcategory) => addNewSubcategory(Subcategory)}
      onEdit={(Subcategory) => updateSubcategory(Subcategory)}
      onDelete={(id) => removeSubcategory(id)}
      loading={loading}
    />
  );
}
