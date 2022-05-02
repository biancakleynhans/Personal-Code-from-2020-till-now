import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FIREBASE_REAL_TIME_DB } from "./FirebaseConfig";
import { iInventory, iProduct } from "../models/Product_models";
import { child, onValue, push, ref, set } from "firebase/database";

interface iProps {
  children: ReactNode;
}

interface iDataContext {
  CreateNewProduct: (product: iProduct) => void;
  Inventory: iInventory;
  UpdateProduct: (product: iProduct, id: string) => void;
  DeleteProduct: (id: string) => void;
}

const INVENTORY_STRING = "Inventory";
// const INVENTORY_DB = collection(FIREBASE_FIRESTORE, INVENTORY_STRING);

const DataContext = createContext<iDataContext>({} as iDataContext);
export const useData = () => useContext(DataContext);

export default function DataContextProvider({ children, ...props }: iProps) {
  const [Inventory, setInventory] = useState<iInventory>({});

  // Get All products from db
  useEffect(() => {
    let Base_Ref = ref(FIREBASE_REAL_TIME_DB, INVENTORY_STRING);
    onValue(Base_Ref, (snapshot) => {
      const data = snapshot.val();
      // console.log("DATA: ", data);
      setInventory(data);
    });
  }, []);

  useEffect(() => {}, [Inventory]);

  //   ALL FUNCTIONS GO HERE
  /*Creates the new product and saves it to the db*/
  function CreateNewProduct(product: iProduct) {
    let pathString = `${INVENTORY_STRING}/${product.category}/${product.subcategory}`;
    let Base_Ref = ref(FIREBASE_REAL_TIME_DB, pathString);
    const newKey = push(child(Base_Ref, "/products")).key;
    let Ref = ref(FIREBASE_REAL_TIME_DB, `${pathString}/products/${newKey}`);

    product.id = newKey !== null ? newKey : "";
    return set(Ref, product);
  }

  /*Update product and save it to the db*/
  function UpdateProduct(product: any, id: string) {}

  /*Update product and save it to the db*/
  function DeleteProduct(id: string) {}

  const value = {
    CreateNewProduct,
    Inventory,
    UpdateProduct,
    DeleteProduct
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
