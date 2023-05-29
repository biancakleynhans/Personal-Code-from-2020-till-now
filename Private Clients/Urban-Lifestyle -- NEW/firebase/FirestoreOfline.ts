// Enable offline support For FIRESTORE DB
import { FirebaseApp } from 'firebase/app';
import { enableIndexedDbPersistence, Firestore, getFirestore } from 'firebase/firestore';

export function EnableOffline(app: FirebaseApp): Firestore {
  const fStore = getFirestore(app);

  // if (process.env.NODE_ENV !== 'development') {
  try {
    enableIndexedDbPersistence(fStore)
      .then(() => {
        //   // Subsequent queries will use persistence, if it was enabled successfully
        console.log('Offline enabled');
      })
      .catch((err) => {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a a time.
          console.log('already open in another tab');
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the features required to enable persistence
          console.log('Browser does not support offline');
        } else {
          console.log('some other reson it is not working', err);
        }
      });
  } catch (err) {
    console.log('ERR', err);
  }
  // }

  return fStore;
}
