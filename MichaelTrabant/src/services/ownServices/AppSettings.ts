/** @format */

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
    ownerEmail: string;
  };
}
type environments = "dutch" | "dev" | "test";

//change this each time
const settingsModule = {
  env: "dev" as environments
};

const configs = {
  dutch: {
    firebase: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    },
    other: {
      appbaseUrl: "",
      shareUrl: "",
      ownerEmail: ""
    }
  },
  test: {
    firebase: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    },
    other: {
      appbaseUrl: "",
      shareUrl: "",
      ownerEmail: ""
    }
  },
  dev: {
    firebase: {
      databaseURL: "https://trabant-e9129-default-rtdb.firebaseio.com",
      apiKey: "AIzaSyCt9rYbx3FUziJuCZZNLw-bFhQlD3elMhI",
      authDomain: "trabant-e9129.firebaseapp.com",
      projectId: "trabant-e9129",
      storageBucket: "trabant-e9129.appspot.com",
      messagingSenderId: "147011082865",
      appId: "1:147011082865:web:da6e9f77e300e114aad9d0",
      measurementId: "G-J9SELM9X3J"
    },
    other: {
      appbaseUrl: "https://trabant-e9129.web.app/",
      shareUrl: "",
      ownerEmail: "test@test.com"
    }
  }
} as NamedDict<AppSettings>;

export function GetAppSettings() {
  return configs[settingsModule.env];
}
