import React, { useEffect, useState } from 'react';
import Grided from '../../components/layouts/Gridded';
import { useProductsData } from '../../context/ProductsContext';
import { iCatSubCat, iSend } from '../../models/Products';
import { UploadImageFileAndGetUrl } from '../../firebase/FileUploadToStorage';

const defaultCategory: iSend = {
  id: '',
  images: [],
  name: '',
  desc: '',
};

export default function Category() {
  const { categories, CreateNew, UpdateEntry, RemoveEntry } = useProductsData();

  const [loading, setloading] = useState(false);

  useEffect(() => {
    // console.log('categories', categories);
  }, [categories]);

  function addNewcategory(category: iCatSubCat) {
    // console.log('New: ', category);

    setloading(true);
    // Upload images first
    UploadImageFileAndGetUrl(category.images.map((x) => x.data)).then((imgs) => {
      // console.log('Imgs', imgs);

      let temp: iSend = { name: category.name, images: imgs, id: '', desc: category.desc };

      CreateNew(temp, 'category')
        .then(() => {
          setloading(false);
        })
        .catch(() => alert('an error occured trying to create a new category please try again'));
    });
  }

  function updatecategory(category: iCatSubCat) {
    // console.log('edit', category);
    setloading(true);
    let newUpload = [];
    let old: string[] = [];
    let t = category.images.filter((e) => e.data.size === 0);
    old = t.map((e) => e.url);
    newUpload = category.images.filter((e) => e.data.size > 0).map((x) => x.data);
    // console.log('old', old, 'new', newUpload);

    if (newUpload.length > 0) {
      //   // // Upload images first
      UploadImageFileAndGetUrl(newUpload).then((imgs) => {
        let temp: iSend = { name: category.name, images: [...old, ...imgs], id: category.id, desc: category.desc };
        //   //   console.log('SENDING...', temp);
        UpdateEntry(temp, 'category').then(() => {
          setloading(false);
        });
      });
    } else {
      let temp: iSend = { name: category.name, images: [...old], id: category.id, desc: category.desc };
      // console.log('SENDING...', temp);
      UpdateEntry(temp, 'category').then(() => {
        setloading(false);
      });
    }
  }

  function removecategory(id: string) {
    setloading(true);
    RemoveEntry(id, 'category');
    setloading(false);
  }

  return (
    <Grided
      header='Categories'
      typePage='category'
      typeCreate='category'
      displayArr={categories}
      defaultObject={defaultCategory}
      onAdd={(category) => addNewcategory(category)}
      onEdit={(category) => updatecategory(category)}
      onDelete={(id) => removecategory(id)}
      loading={loading}
    />
  );
}
