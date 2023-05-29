import { onValue } from "firebase/database";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { INVENTORY_DB, PATH_STRING_BRANDS, PATH_STRING_CATEGORIES, PATH_STRING_INVENTORY, PATH_STRING_SUBCATEGORIES } from "../constants/Firebase";
import { isend } from "../firebase/FirebaseAdmin";
import { iProduct } from "../models/Products";

interface iProps {
  children: ReactNode;
}

interface iData {
  inventory: null | { [k: string]: iProduct };
  categories: null | { [k: string]: isend };
  subcategories: null | { [k: string]: isend };
  brands: null | { [k: string]: isend };
}

const Data = createContext<iData>({} as iData);
export const useData = () => useContext(Data);

export default function DataContextProvider({ children, ...props }: iProps) {
  const [inventory, setinventory] = useState<null | { [k: string]: iProduct }>(null);
  const [categories, setcategories] = useState<null | { [k: string]: isend }>(null);
  const [subcategories, setsubcategories] = useState<null | { [k: string]: isend }>(null);
  const [brands, setbrands] = useState<null | { [k: string]: isend }>(null);

  useEffect(() => {
    onValue(INVENTORY_DB, (snapshot) => {
      const data = snapshot.val();
      // console.log("INVENTORY DATA: ", cats, subcats, inv);

      if (data[PATH_STRING_CATEGORIES] !== undefined) {
        setcategories(data[PATH_STRING_CATEGORIES]);
      }
      if (data[PATH_STRING_SUBCATEGORIES] !== undefined) {
        setsubcategories(data[PATH_STRING_SUBCATEGORIES]);
      }
      if (data[PATH_STRING_INVENTORY] !== undefined) {
        setinventory(data[PATH_STRING_INVENTORY]);
      }
      if (data[PATH_STRING_BRANDS] !== undefined) {
        setbrands(data[PATH_STRING_BRANDS]);
      }
    });
  }, []);

  useEffect(() => {
    // console.log("ALLL", categories, subcategories, inventory, brands);
  }, [inventory, subcategories, categories, brands]);

  const value = {
    inventory,
    categories,
    subcategories,
    brands
  };

  return <Data.Provider value={value}>{children}</Data.Provider>;
}
