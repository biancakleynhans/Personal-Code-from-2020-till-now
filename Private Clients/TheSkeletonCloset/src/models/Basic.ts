import { iCart, iOrder, iProduct } from "./Products";

export interface iInfoBase {
  uid: string;
  role: "user" | "admin" | "super" | "dev";

  name: string;
  email: string;

  // new:
  id: string;
  birthday: string | Date;
  cell: string;
  gender: string;

  adressBook: iAdress;
  wishlist: iProduct[];
  orders: iOrder[];
  cart: iCart[];
}

export interface iUpdateProfile {
  name: string;
  email: string;

  // new:
  id: string;
  birthday: string | Date;
  cell: string;
  gender: string;
}

export interface iAdress {
  street: string;
  number: string;
  suburb: string;
  city: string;
  postalCode: string;
  province: string;
  country: "South Africa";
  isDefault: boolean;
}

export const genders = ["Male", "Female", "Gender-fluid"];

export const ProvinceList = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];

export interface iBanking {
  bankName: string;
  acc: string;
  accName: string;
  type: "SAVINGS" | "CHEQUE" | "CREDIT";
}
