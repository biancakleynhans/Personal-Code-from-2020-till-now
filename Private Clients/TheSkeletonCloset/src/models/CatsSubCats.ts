import { ImageArr } from "../firebase/FirebaseStorage";

export interface iCatSubCat {
  name: string;
  images: ImageArr[];
}

export interface iInventory {
  [cat: string]: {
    name: string;
    images: string[];
    subCat: {
      name: string;
      images: string[];
      products: {};
    };
  };
}
