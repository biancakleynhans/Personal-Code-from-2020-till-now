import { deleteField, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "./FirebaseConfig";
import { iAdress, iInfoBase, iUpdateProfile } from "../models/Basic";
import { PATH_STRING_USERS, USER_DB } from "../constants/Firebase";
import { iCart, iOrder } from "../models/Products";

export async function CreateNewUser(uid: string, payload: iInfoBase): Promise<void> {
  const docRef = doc(FIREBASE_FIRESTORE, PATH_STRING_USERS, uid);
  // Create a query against the collection.
  const q = query(USER_DB, where("uid", "==", `${uid}`));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) {
    return await setDoc(docRef, payload);
  }
}

export async function UpdateUserProfile(uid: string, payloadProfile: iUpdateProfile | null, payloadAdress: iAdress | null): Promise<void> {
  const docRef = doc(FIREBASE_FIRESTORE, PATH_STRING_USERS, uid);
  if (payloadProfile) {
    return updateDoc(docRef, {
      name: payloadProfile.name,
      email: payloadProfile.email,
      id: payloadProfile.id,
      birthday: payloadProfile.birthday,
      cell: payloadProfile.cell,
      gender: payloadProfile.gender
    });
  }
  if (payloadAdress) {
    return updateDoc(docRef, {
      adressBook: payloadAdress
    });
  }
}

export function addToUserCart(uid: string, updatedCart: iCart[]) {
  const docRef = doc(FIREBASE_FIRESTORE, PATH_STRING_USERS, uid);
  console.log(uid, "Adding to cart...", updatedCart);
  return updateDoc(docRef, {
    cart: updatedCart
  });
}

export async function cartToOrder(uid: string, cart: iCart[], orderAdded: iOrder[]) {
  console.log("Processing cart to order", uid, cart, orderAdded);

  // Clear cart
  const ref = doc(FIREBASE_FIRESTORE, PATH_STRING_USERS, uid);

  // Remove the 'capital' field from the document
  await updateDoc(ref, {
    cart: deleteField()
  });

  // Update Orders Array
  await updateDoc(ref, {
    orders: orderAdded
  });
}

export async function addPaymentToOrder(uid: string, orders: iOrder[]) {
  const ref = doc(FIREBASE_FIRESTORE, `${PATH_STRING_USERS}/${uid}`);
  return await updateDoc(ref, { orders: orders });
}

export async function addDatesToOrder(uid: string, ordersUpdated: iOrder[]) {
  const ref = doc(FIREBASE_FIRESTORE, `${PATH_STRING_USERS}/${uid}`);
  return await updateDoc(ref, { orders: ordersUpdated });
}
