import { NamedDict } from "../helpers/Tools";

interface FirebaseSettings {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface AppSettings {
  firebase: FirebaseSettings;
  other: {
    appbaseUrl: string;
    shareUrl: string;
  };
}
type environments = "dutch" | "test";

//change this each time
const settingsModule = {
  env: "dutch" as environments
};

const configs = {
  dutch: {
    firebase: {
      databaseURL: "https://tauschfarm-6180b-default-rtdb.firebaseio.com/",
      apiKey: "AIzaSyDa-ZoR99_PacIubPtqeaq5qs4WlGSAFEU",
      authDomain: "tauschfarm-6180b.firebaseapp.com",
      projectId: "tauschfarm-6180b",
      storageBucket: "tauschfarm-6180b.appspot.com",
      messagingSenderId: "517063231489",
      appId: "1:517063231489:web:5f4b9712ef55ac6b771800",
      measurementId: "G-36GZN0VHDN"
    },
    other: {
      appbaseUrl: "https://firebasestorage.googleapis.com/v0/b/tauschfarm.appspot.com/o",
      shareUrl: "https://tauschfarm.firebaseapp.com/"
    }
  },
  test: {
    firebase: {
      databaseURL: "https://tauschfarm-6180b-default-rtdb.firebaseio.com/",
      apiKey: "AIzaSyDa-ZoR99_PacIubPtqeaq5qs4WlGSAFEU",
      authDomain: "tauschfarm-6180b.firebaseapp.com",
      projectId: "tauschfarm-6180b",
      storageBucket: "tauschfarm-6180b.appspot.com",
      messagingSenderId: "517063231489",
      appId: "1:517063231489:web:5f4b9712ef55ac6b771800",
      measurementId: "G-36GZN0VHDN"
    },
    other: {
      appbaseUrl: "",
      shareUrl: ""
    }
  }
} as NamedDict<AppSettings>;

export function GetAppSettings() {
  return configs[settingsModule.env];
}
