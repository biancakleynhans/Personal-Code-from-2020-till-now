import { ref, remove, set, update } from "firebase/database";
import { PATH_STRING_BRANDS, PATH_STRING_CATEGORIES, PATH_STRING_INVENTORY, PATH_STRING_SUBCATEGORIES } from "../constants/Firebase";
import { iProduct } from "../models/Products";
import { FIREBASE_REAL_TIME_DB } from "./FirebaseConfig";

export interface isend {
  name: string;
  images: string[];
}

/* CATEGORIES */
export function AddNewCat(cat: isend) {
  let path = `${PATH_STRING_CATEGORIES}/${cat.name}`;
  return set(ref(FIREBASE_REAL_TIME_DB, path), cat);
}
export function UpdateCat(cat: isend) {
  let path = `${PATH_STRING_CATEGORIES}/${cat.name}`;
  return update(ref(FIREBASE_REAL_TIME_DB, path), cat);
}
export function DeleteCat(catName: string) {
  let path = `${PATH_STRING_CATEGORIES}/${catName}`;
  return remove(ref(FIREBASE_REAL_TIME_DB, path));
}

/* SUB CATEGORIES */
export function AddNewSubCat(subcat: isend) {
  let path = `${PATH_STRING_SUBCATEGORIES}/${subcat.name}`;
  return set(ref(FIREBASE_REAL_TIME_DB, path), subcat);
}
export function UpdateSubCat(subcat: isend) {
  let path = `${PATH_STRING_SUBCATEGORIES}/${subcat.name}`;
  return update(ref(FIREBASE_REAL_TIME_DB, path), subcat);
}
export function DeleteSubCat(subcatName: string) {
  let path = `${PATH_STRING_SUBCATEGORIES}/${subcatName}`;
  return remove(ref(FIREBASE_REAL_TIME_DB, path));
}

/* BRANDS */
export function AddNewBrand(brand: isend) {
  let path = `${PATH_STRING_BRANDS}/${brand.name}`;
  return set(ref(FIREBASE_REAL_TIME_DB, path), brand);
}
export function UpdateBrand(brand: isend) {
  let path = `${PATH_STRING_BRANDS}/${brand.name}`;
  return update(ref(FIREBASE_REAL_TIME_DB, path), brand);
}
export function DeleteBrand(brandName: string) {
  let path = `${PATH_STRING_BRANDS}/${brandName}`;
  return remove(ref(FIREBASE_REAL_TIME_DB, path));
}

/* PRODUCTS */
export function AddNewProduct(product: iProduct) {
  const REF = ref(FIREBASE_REAL_TIME_DB, PATH_STRING_INVENTORY);

  let id = new Date().getTime().toString();
  product.id = id;

  let send = { [id]: product };
  console.log(">>", send);

  return update(REF, send);
}
export function AddMultipleNewProducts(products: iProduct[]) {
  const REF = ref(FIREBASE_REAL_TIME_DB, PATH_STRING_INVENTORY);

  let send = {};

  products.forEach((prod, index) => {
    send = {
      ...send,
      [(new Date().getTime() + index).toString()]: {
        ...prod,
        id: new Date().getTime().toString() + index
      }
    };
  });

  console.log(">>", send);

  return update(REF, send);
}
export function UpdateProduct(product: iProduct) {
  let path = `${PATH_STRING_INVENTORY}/${product.id}`;
  console.log("???", path, product);
  return update(ref(FIREBASE_REAL_TIME_DB, path), product);
}
export function DeleteProduct(product: iProduct) {
  let path = `${PATH_STRING_INVENTORY}/${product.id}`;
  return remove(ref(FIREBASE_REAL_TIME_DB, path));
}
