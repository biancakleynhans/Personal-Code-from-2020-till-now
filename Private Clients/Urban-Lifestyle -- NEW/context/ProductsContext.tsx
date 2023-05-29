import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from '../firebase/ConfigSetup';
import { iProduct, iSend } from '../models/Products';

interface iProductsContext {
  inventory: iProduct[];
  categories: iSend[];
  subcategories: iSend[];
  brands: iSend[];
  CreateNew: (item: iSend | iProduct, type: 'category' | 'subcategory' | 'brand' | 'inventory') => Promise<DocumentReference<DocumentData>>;
  UpdateEntry: (item: iSend, type: 'category' | 'subcategory' | 'brand' | 'inventory') => Promise<void>;
  UpdateProduct: (item: iProduct) => Promise<void>;
  RemoveEntry: (id: string, type: 'category' | 'subcategory' | 'brand' | 'inventory') => Promise<void>;
}

interface iProps {
  children: ReactNode;
  // any other props that come into the component
}

// CONTEXT
const ProductsDataContext = createContext<iProductsContext>({} as iProductsContext);
export const useProductsData = () => useContext(ProductsDataContext);

//   CONSTANTS
const PATH_STRING_INVENTORY = 'INVENTORY';
const PATH_STRING_CATEGORIES = 'CATEGORIES';
const PATH_STRING_SUBCATEGORIES = 'SUBCATEGORIES';
const PATH_STRING_BRANDS = 'BRANDS';

const COLLECTION__INVENTORY_REF = collection(FIREBASE_FIRESTORE, PATH_STRING_INVENTORY);
const COLLECTION_CATEGORIES_REF = collection(FIREBASE_FIRESTORE, PATH_STRING_CATEGORIES);
const COLLECTION_SUBCATEGORIES_REF = collection(FIREBASE_FIRESTORE, PATH_STRING_SUBCATEGORIES);
const COLLECTION_BRANDS_REF = collection(FIREBASE_FIRESTORE, PATH_STRING_BRANDS);

// will return inventory if not one of type
function getDbRef(type: 'category' | 'subcategory' | 'brand' | 'inventory'): CollectionReference<DocumentData> {
  if (type === 'brand') {
    return COLLECTION_BRANDS_REF;
  } else if (type === 'category') {
    return COLLECTION_CATEGORIES_REF;
  } else if (type === 'subcategory') {
    return COLLECTION_SUBCATEGORIES_REF;
  } else {
    return COLLECTION__INVENTORY_REF;
  }
}

// PROVIDER
export default function ProductsDataProvider({ children, ...props }: iProps) {
  // STATES
  const [cats, setcats] = useState<iSend[]>([]);
  const [subCats, setsubCats] = useState<iSend[]>([]);
  const [brands, setbrands] = useState<iSend[]>([]);
  const [inventory, setinventory] = useState<iProduct[]>([]);

  //   setup and init db call to open up connection stream
  useEffect(() => {
    getAll('brand');
    getAll('category');
    getAll('subcategory');
    getAll('inventory');
  }, []);

  useEffect(() => {}, [brands, cats, subCats, inventory]);

  //   get all data
  function getAll(type: 'category' | 'subcategory' | 'brand' | 'inventory') {
    let all: iSend[] = [];
    let allProducts: iProduct[] = [];
    const q = query(getDbRef(type));

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      // let source = snapshot.metadata.fromCache ? 'local cache' : 'server';
      //   // console.log('SOURCE IS: ', source);
      snapshot.docChanges().map((change) => {
        let t: iSend = change.doc.data() as iSend;
        t.id = change.doc.id;
        all.push(t);

        let p: iProduct = change.doc.data() as iProduct;
        p.id = change.doc.id;
        allProducts.push(p);

        if (type === 'brand') {
          setbrands(all);
        } else if (type === 'category') {
          return setcats(all);
        } else if (type === 'subcategory') {
          return setsubCats(all);
        } else {
          setinventory(allProducts);
        }
      });
    });
  }

  //   ALL FUNCTIONS
  /*Creates the new entry and saves it to the db*/
  async function CreateNew(item: iSend | iProduct, type: 'category' | 'subcategory' | 'brand' | 'inventory') {
    let db = getDbRef(type);
    return await addDoc(db, item);
  }

  /*Update entry and save it to the db*/
  async function UpdateEntry(item: iSend, type: 'category' | 'subcategory' | 'brand' | 'inventory') {
    let strng = type === 'brand' ? PATH_STRING_BRANDS : type === 'category' ? PATH_STRING_CATEGORIES : type === 'subcategory' ? PATH_STRING_SUBCATEGORIES : '';
    const Ref = doc(FIREBASE_FIRESTORE, strng, item.id);
    return await updateDoc(Ref, { id: item.id, name: item.name, images: item.images, desc: item.desc });
  }

  async function UpdateProduct(item: iProduct) {
    let strng = PATH_STRING_INVENTORY;
    const Ref = doc(FIREBASE_FIRESTORE, strng, item.id);
    return await updateDoc(Ref, {
      name: item.name,
      desc: item.desc,
      size: item.size,
      color: item.name,
      priceRaw: item.priceRaw,
      priceSell: item.priceSell,
      markupPercentage: item.markupPercentage,
      discountPercentage: item.discountPercentage,
      stock: item.stock,
      images: item.images,
      category: item.category,
      subcategory: item.subcategory,
      brand: item.brand,
    });
  }

  /*Delete entry from the db*/
  async function RemoveEntry(id: string, type: 'category' | 'subcategory' | 'brand' | 'inventory') {
    let strng = type === 'brand' ? PATH_STRING_BRANDS : type === 'category' ? PATH_STRING_CATEGORIES : type === 'subcategory' ? PATH_STRING_SUBCATEGORIES : '';
    const Ref = doc(FIREBASE_FIRESTORE, strng, id);
    return await deleteDoc(Ref);
  }

  //   Acessing and setting the values to the required entities
  const value = {
    inventory: inventory,
    categories: cats,
    subcategories: subCats,
    brands: brands,

    CreateNew,
    UpdateEntry,
    UpdateProduct,
    RemoveEntry,
  };
  return <ProductsDataContext.Provider value={value}>{children}</ProductsDataContext.Provider>;
}
