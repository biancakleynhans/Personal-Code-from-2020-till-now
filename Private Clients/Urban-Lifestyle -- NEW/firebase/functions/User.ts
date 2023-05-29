/* USER FUNCTIONS */

import { getDocs, query, where, doc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from '../../firebase/ConfigSetup';
import { iUser, iUserUpdate } from '../../models/User';

//   CONSTANTS
const PATH_STRING = 'USERS';
const COLLECTION_REF = collection(FIREBASE_FIRESTORE, PATH_STRING);

//TODO: Fix this function its not good
function generateUser(uid: string, nUser: iUserUpdate, oUser: any) {
  // // console.log("Check what i got", nUser, oUser);
  let payload: iUser = {} as iUser;

  payload = {
    cart: [],
    orders: [],
    role: oUser.role,
    fn: nUser.fn,
    ln: nUser.ln,
    cell: nUser.cell,
    email: nUser.email,
    profileUrl: nUser.profileImg,
    displayName: `${nUser.fn} ${nUser.ln}`,
    adress: nUser.addr,
    uid: uid,
    company: process.env.NEXT_PUBLIC_COMPANY_NAME ? process.env.NEXT_PUBLIC_COMPANY_NAME : 'none',
    fmcToken: nUser.fmcToken,
    birthday: '',
    gender: '',
    wishlist: [],
  };

  payload.fn = payload.fn.length === 0 ? (oUser.fn && oUser.fn.length > 0 ? oUser.fn : '') : payload.fn;
  payload.ln = payload.ln.length === 0 ? (oUser.ln && oUser.ln.length > 0 ? oUser.ln : '') : payload.ln;
  payload.cell = payload.cell.length === 0 ? (oUser.cell && oUser.cell.length > 0 ? oUser.cell : '') : payload.cell;
  payload.email = payload.email.length === 0 ? (oUser.email && oUser.email.length > 0 ? oUser.email : '') : payload.email;
  payload.profileUrl = payload.profileUrl.length === 0 ? (oUser.profileUrl && oUser.profileUrl.length > 0 ? oUser.profileUrl : '') : payload.profileUrl;
  payload.displayName = payload.displayName.length === 0 ? (oUser.displayName && oUser.displayName.length > 0 ? oUser.displayName : '') : payload.displayName;
  payload.adress = ''; //payload.adress.length === 0 ? (oUser.adress && oUser.adress.length > 0 ? oUser.adress : '') : payload.adress;
  payload.company = payload.company.length === 0 ? (oUser.company && oUser.company.length > 0 ? oUser.company : process.env.NEXT_PUBLIC_COMPANY_NAME) : payload.company;
  payload.fmcToken = payload.fmcToken.length === 0 ? (oUser.fmcToken && oUser.fmcToken.length > 0 ? oUser.fmcToken : '') : payload.fmcToken;

  // // console.log(uid, "OLD", oUser, "NEW", nUser, "PAYLOAD", payload);
  return payload;
}

// Adding a new user to db
export async function createUser(uid: string, user: iUser, newData: iUserUpdate): Promise<void> {
  const docRef = doc(FIREBASE_FIRESTORE, PATH_STRING, uid);

  let payload = generateUser(uid, newData, user);
  const q = query(COLLECTION_REF, where('uid', '==', `${uid}`));
  const querySnapshot = await getDocs(q);
  // // console.log("Q", q, "QS", querySnapshot.docs.length);

  if (querySnapshot.docs.length == 0) {
    return await setDoc(docRef, payload);
  }
}

// Editing an existing user's details
export async function updateUserProfile(uid: string, user: iUser, newData: iUserUpdate): Promise<void> {
  const DocRef = doc(FIREBASE_FIRESTORE, PATH_STRING, uid);

  let payload: iUser = generateUser(uid, newData, user);
  payload.role = user.role;
  // console.log('user update', payload);

  return await updateDoc(DocRef, {
    cell: payload.cell,
    displayName: `${payload.fn} ${payload.ln}`.toUpperCase(),
    fn: payload.fn,
    ln: payload.ln,
    adress: payload.adress,
    company: payload.company,
    email: payload.email,
  });
}

// Editing an existing user's fmc token for push notifications
export async function updateUserFMC(uid: string, token: string): Promise<void> {
  const DocRef = doc(FIREBASE_FIRESTORE, PATH_STRING, uid);

  // // console.log('user update FMC ', uid, token);

  await updateDoc(DocRef, {
    fmcToken: token,
  })
    .then((res) => {
      // console.log('RES UPDATE', res);
    })
    .catch((err) => {
      // console.log('err UPDATE', err);
    });
}
