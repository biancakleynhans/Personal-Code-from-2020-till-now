/* USERS SHOPPING FUNTIONS */

import { collection, doc, updateDoc } from 'firebase/firestore';
import { iCart, iWishList } from '../../models/Products';
import { FIREBASE_FIRESTORE } from '../ConfigSetup';

const PATH_STRING = 'USERS';
const COLLECTION_REF = collection(FIREBASE_FIRESTORE, PATH_STRING);

export function addToUserCart(uid: string, updatedCart: iCart[]): Promise<void> {
  const docRef = doc(COLLECTION_REF, uid);
  // console.log(uid, 'Adding to cart...', updatedCart);
  return updateDoc(docRef, { cart: updatedCart });
}

export function addToUserWishlist(uid: string, updatedWishList: iWishList[]): Promise<void> {
  const docRef = doc(COLLECTION_REF, uid);
  // console.log(uid, 'Adding to WishList...', updatedWishList);
  return updateDoc(docRef, { wishlist: updatedWishList });
}
