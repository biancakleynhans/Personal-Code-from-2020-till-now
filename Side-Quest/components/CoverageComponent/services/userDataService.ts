import { Utilities } from '../utils/utilities';
import { getLocalStorageItem, setLocalStorageItem } from './storageService';

interface IUserDataSearchAddress {
  complex: string;
  streetNumber: string;
  street: string;
  suburb: string;
  town: string;
  province: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  locationType: string;
  locationTypes: Array<string>;
  formattedAddress: string;
  placeId: string;
  servicesAvailable: any;
  fibreAvailability: UserDataSearchAddressAvailability;
  lteAvailability: UserDataSearchAddressAvailability;
  pureDslAvailability: UserDataSearchAddressAvailability;
}

export interface IUserData {
  id: string;
  customerType: string;
  type: UserDataCustomerType;
  name: string;
  addressSearchMade: boolean;
  addressSearch: IUserDataSearchAddress;
  options: any;
  dateCreated: any;
  dateModified: any;
}

export enum UserDataCustomerType {
  NEW = 'NEW CUSTOMER',
  NEW_LEAD = 'NEW CUSTOMER LEAD',
  EXISTING_CUSTOMER = 'EXISTING CUSTOMER',
}

export enum UserDataSearchAddressAvailability {
  NotAvailable = 'NOT AVAILABLE',
  ComingSoon = 'COMING SOON',
  Available = 'AVAILABLE',
}

const DEFAULT_USER: IUserData = {
  addressSearch: {
    complex: '',
    streetNumber: '',
    street: '',
    suburb: '',
    town: '',
    province: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    locationType: '',
    locationTypes: [],
    formattedAddress: '',
    placeId: '',
    servicesAvailable: [],
    fibreAvailability: UserDataSearchAddressAvailability.NotAvailable,
    lteAvailability: UserDataSearchAddressAvailability.NotAvailable,
    pureDslAvailability: UserDataSearchAddressAvailability.NotAvailable,
  },
  addressSearchMade: false,
  customerType: UserDataCustomerType.NEW,
  dateCreated: new Date(),
  dateModified: new Date(),
  id: Utilities.guid(),
  name: '',
  options: {
    darkMode: false,
    categoryListView: false,
  },
  type: UserDataCustomerType.NEW,
};

// export class UserDataSearchAddress {

//     complex: string;
//     streetNumber: string;
//     street: string;
//     suburb: string;
//     town: string;
//     province: string;
//     postalCode: string;

//     latitude: string;
//     longitude: string;
//     locationType: string;
//     locationTypes: Array<string>;
//     formattedAddress: string;
//     placeId: string;

//     servicesAvailable: []; //ICoverageDataService[];

//     fibreAvailability: UserDataSearchAddressAvailability;
//     lteAvailability: UserDataSearchAddressAvailability;
//     pureDslAvailability: UserDataSearchAddressAvailability;

//     dateModified: any;

//     constructor() {

//         this.servicesAvailable = [];

//         this.fibreAvailability = UserDataSearchAddressAvailability.NotAvailable;
//         this.lteAvailability   = UserDataSearchAddressAvailability.NotAvailable;
//         this.pureDslAvailability = UserDataSearchAddressAvailability.NotAvailable;

//         this.dateModified = new Date();
//     }
// }

// export class UserDataSearchAddressFactory {

//     static getInstance(
//         complex: string,
//         streetNumber: string,
//         street: string,
//         suburb: string,
//         town: string,
//         province: string,
//         postalCode: string,
//         latitude: string,
//         longitude: string,
//         locationType: string,
//         locationTypes: Array<string>,
//         formattedAddress: string,
//         placeId: string,
//         servicesAvailable: any,
//         fibreAvailability: UserDataSearchAddressAvailability,
//         lteAvailability: UserDataSearchAddressAvailability,
//         pureDslAvailability: UserDataSearchAddressAvailability
//     ): UserDataSearchAddress {

//         return {
//             complex:      complex,
//             streetNumber: streetNumber,
//             street:       street,
//             suburb:       suburb,
//             town:         town,
//             province:     province,
//             postalCode:   postalCode,

//             latitude:  latitude,
//             longitude: longitude,
//             locationType: locationType,
//             locationTypes: locationTypes,
//             formattedAddress: formattedAddress,
//             placeId: placeId,

//             servicesAvailable: servicesAvailable,

//             fibreAvailability: fibreAvailability,
//             lteAvailability:   lteAvailability,
//             pureDslAvailability: pureDslAvailability,

//             dateModified: Date()
//         };
//     }
// }

// export class UserDataOptions {

//     darkMode: boolean;
//     categoryListView: boolean;

//     constructor() {

//         this.darkMode = false;
//         this.categoryListView = false;
//     }
// }

// export class UserData {

//     id: string;
//     customerType: string;
//     type: UserDataCustomerType;
//     name: string;
//     addressSearchMade: boolean;
//     addressSearch: UserDataSearchAddress;
//     options: UserDataOptions;
//     dateCreated: any;
//     dateModified: any;

//     constructor(customerType: UserDataCustomerType, name: string) {

//         this.id                = Utilities.guid();
//         this.customerType      = 'New Customer';
//         this.type              = customerType;
//         this.name              = name;
//         this.addressSearchMade = false;
//         this.addressSearch     = new UserDataSearchAddress();
//         this.options           = new UserDataOptions();
//         this.dateCreated       = new Date();
//         this.dateModified      = new Date();
//     }
// }

function initialiseUserData(): IUserData {
  if (!hasUserData()) {
    let userData = DEFAULT_USER;
    setUserData(userData);
    return userData;
  } else {
    return getUserData();
  }
}

function getUserData(): IUserData {
  let localStorage = getLocalStorageItem('userData');

  if (localStorage) {
    let user = localStorage as IUserData;
    return user;
  } else {
    return DEFAULT_USER;
  }
}

function setUserData(userData: IUserData) {
  setLocalStorageItem('userData', userData);
}

function hasUserData(): boolean {
  //   console.log('%c !!!', 'color:red', !!getLocalStorageItem('userData'), '%c !!!!');
  return !!getLocalStorageItem('userData');
}

export const UserDataService = {
  initialiseUserData,
  getUserData,
};
