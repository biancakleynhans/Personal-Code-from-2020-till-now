import { UserTypes } from '../constants/AppConstants';
import { iCart, iWishList } from './Products';

export interface iUser {
  role: UserTypes;
  fn: string;
  ln: string;
  cell: string;
  email: string;
  profileUrl: string;
  displayName: string;
  adress: string | iAdress;
  uid: string;
  company: string;
  fmcToken: string;
  cart: iCart[];
  wishlist: iWishList[];
  orders: any[];
  birthday: string | Date;
  gender: string;
}

export interface iUserUpdate {
  fn: string;
  ln: string;
  cell: string;
  addr: string | iAdress;
  email: string;
  profileImg: string;
  company: string;
  fmcToken: string;
  birthday: string | Date;
  gender: string;
}

export interface iAdress {
  street: string;
  number: string;
  suburb: string;
  city: string;
  postalCode: string;
  province: string;
  country: 'South Africa';
  isDefault: boolean;
}

export const genders = ['Male', 'Female', 'Gender-fluid', 'Other'];

export const ProvinceList = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'];

export interface iBanking {
  bankName: string;
  acc: string;
  accName: string;
  type: 'SAVINGS' | 'CHEQUE' | 'CREDIT';
}
