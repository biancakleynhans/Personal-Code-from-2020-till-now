import { addDoc, collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { iBooking, ReviewEmail } from "../../models/User_models";
import { FIREBASE_FIRESTORE } from "./FirebaseConfig";

const BOOKINGS = "BOOKINGS";
const BOOKING_DB = collection(FIREBASE_FIRESTORE, BOOKINGS);

const REVIEWS = "REVIEWS";
const REVIEWS_DB = collection(FIREBASE_FIRESTORE, REVIEWS);

export async function SaveBookingToDB(data: iBooking) {
  let complete = "";
  return new Promise<string>(async (resolve, reject) => {
    await addDoc(BOOKING_DB, data)
      .then((res) => {
        console.log("RES", res);
        complete = "Sucsess";
        resolve(complete);
      })
      .catch((err) => {
        console.log("ERROR", err);
        complete = "Error";
        resolve(complete);
      });
  });
}

export async function SaveReviewsToDB(data: ReviewEmail) {
  let complete = "";
  return new Promise<string>(async (resolve, reject) => {
    await addDoc(REVIEWS_DB, data)
      .then((res) => {
        console.log("RES", res);
        complete = "Sucsess";
        resolve(complete);
      })
      .catch((err) => {
        console.log("ERROR", err);
        complete = "Error";
        resolve(complete);
      });
  });
}

export async function RetrieveUserBooking(uid: string) {
  let clientBookings: any[] = [];
  let AllclientBookings: any[] = [];

  const q = query(BOOKING_DB);
  const querySnapshot = await getDocs(q);
  // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0]);
  querySnapshot.docs.forEach((doc, index) => {
    // console.log("The user data is: ", doc.data().uid);
    console.log("DOC?? ", doc.id);
    if (doc.data().uid === uid && uid.length > 0) {
      clientBookings.push({ [doc.id]: doc.data() });
    }
    AllclientBookings.push({ [doc.id]: doc.data() });
  });

  console.log("???", clientBookings);
  return { client: clientBookings, admin: AllclientBookings };
}

export async function RetrieveUserReviews() {
  let reviewsArr: any[] = [];

  const q = query(REVIEWS_DB);
  const querySnapshot = await getDocs(q);
  // console.log("Q", q, "QS", querySnapshot.docs.length, querySnapshot.docs[0]);
  querySnapshot.docs.forEach((doc, index) => {
    reviewsArr.push(doc.data());
  });
  console.log("???", reviewsArr);
  return reviewsArr;
}

export async function AddPOPToBookingAndUpdate(bookingUpdated: iBooking, id: string) {
  console.log("Updated Booking", bookingUpdated);
  let complete = "";
  return new Promise<string>(async (resolve, reject) => {
    const Ref = doc(FIREBASE_FIRESTORE, BOOKINGS, id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(Ref, {
      pop: bookingUpdated.pop,
      payed: bookingUpdated.payed
    })
      .then((res) => {
        console.log("RES", res);
        complete = "Sucsess";
        resolve(complete);
      })
      .catch((err) => {
        console.log("ERROR", err);
        complete = "Error";
        resolve(complete);
      });
  });
}
