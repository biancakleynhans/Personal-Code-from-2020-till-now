import { TypesOfActions } from "../TypesOfActions";
import FIREBASE from "../../firebase/FirebaseConfig";
import { TypesToFirebaseGlobals } from "../../firebase/TypesToServer";
import { i_BaseInterface_User } from "../../../models/001UserModels";
import { getReverseGeoCodeRegion } from "../../../components/HERE maps/adressGetAndValidate/ReverseGeoCoding";
import { NamedDict } from "../../helpers/Tools";
import { HelperCreateUser, HelperCreateOwner } from "./GlobalActionHelpers";

var Latitude: string = "";
var Longitude: string = "";

interface iFB_DB {
  USERS: NamedDict<any>;
}

const fbDatabase = FIREBASE.database();
const rootDBref = fbDatabase.ref();

var globalDb = {
  db: {} as iFB_DB
};

export const Global_GetAllData_AtStartUp = () => {
  return (dispatch: any, getState: any) => {
    const Uid = getState().firebase.auth.uid;
    // console.log('Uid', Uid);

    var Owner: any = {};
    var currentUser: any = {};
    var GlobalUsersToApp: NamedDict<i_BaseInterface_User> = {};

    if (getState().user.isEmpty) {
      rootDBref
        .once("value")
        .then((c) => {
          globalDb.db = c.val();
          // console.log('once value', globalDb.db);

          //users
          const GlobalUsersKeys = Object.keys(globalDb.db.USERS);
          GlobalUsersKeys.forEach((key: string) => {
            if (key === Uid) {
              currentUser = HelperCreateUser(globalDb.db.USERS[key], globalDb.db.USERS["PejpCNlOiZNtjs7sXn547QE3Jtf2"][TypesToFirebaseGlobals.Sessions][key]);
            }
            if (key === "PejpCNlOiZNtjs7sXn547QE3Jtf2") {
              Owner = HelperCreateOwner(globalDb.db.USERS[key]);
            }
            if (key !== "PejpCNlOiZNtjs7sXn547QE3Jtf2") {
              GlobalUsersToApp[key] = HelperCreateUser(globalDb.db.USERS[key], globalDb.db.USERS["PejpCNlOiZNtjs7sXn547QE3Jtf2"][TypesToFirebaseGlobals.Sessions][key]);
            }
          });
          return { Owner, GlobalUsersToApp, currentUser };
        })
        .then((done) => {
          // console.log('done', done);

          var dispObj = {
            owner: done.Owner,
            currentUser: done.currentUser,
            global: done.GlobalUsersToApp,
            loading: false
          };
          // console.log('dispObj', dispObj);
          dispatch({
            type: TypesOfActions.APP_DATA_LOADED,
            payload: dispObj
          });
        })
        .catch((error) => {
          dispatch({
            type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
            payload: error
          });
        });
    }

    rootDBref.on("child_changed", (c, b) => {
      const NodeNewValue = c.val();
      const NodeKeyChanged = c.key;
      // 	// const SecNodeChaged = b;

      var state_globalUsers: NamedDict<i_BaseInterface_User> = getState().owner.globalUsers;
      var state_userValues: i_BaseInterface_User = getState().user;
      var state_ownerValues: i_BaseInterface_User = getState().owner.owner;

      console.log("on child_changed", { v: NodeNewValue, k: NodeKeyChanged });
      //user chnaged
      if (NodeKeyChanged === TypesToFirebaseGlobals.User_Root) {
        //start with the users
        const GlobalUsersKeys = Object.keys(NodeNewValue);
        GlobalUsersKeys.forEach((key: string) => {
          if (key === Uid) {
            state_userValues = HelperCreateUser(NodeNewValue[key], NodeNewValue["PejpCNlOiZNtjs7sXn547QE3Jtf2"][TypesToFirebaseGlobals.Sessions][key]);
          }
          if (key === "PejpCNlOiZNtjs7sXn547QE3Jtf2") {
            state_ownerValues = HelperCreateOwner(NodeNewValue[key]);
          }
          if (key !== "PejpCNlOiZNtjs7sXn547QE3Jtf2") {
            state_globalUsers[key] = HelperCreateUser(NodeNewValue[key], NodeNewValue["PejpCNlOiZNtjs7sXn547QE3Jtf2"][TypesToFirebaseGlobals.Sessions][key]);
          }
        });

        var dispObj = {
          owner: state_ownerValues,
          currentUser: state_userValues,
          global: state_globalUsers,
          loading: false
        };
        console.log("dispObj child_changed", dispObj);
        dispatch({
          type: TypesOfActions.APP_DATA_LOADED,
          payload: dispObj
        });
      }
    });
  };
};

export const Global_User_Loc = (user: i_BaseInterface_User) => {
  return (dispatch: any) => {
    // console.log('user loc', user.id);

    var newLoc = {
      location: {
        address: {
          district: "",
          houseNumber: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          county: "",
          label: ""
        },

        locationId: "",
        locationType: "",

        coords: {
          lat: 0,
          long: 0
        }
      }
    };

    if (user.location.address === undefined) {
      console.log("user location ", user.location);

      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          Latitude = position.coords.latitude;
          Longitude = position.coords.longitude;
          console.log("lat, long", Latitude, Longitude);
          //43.42387,15.490238

          var locCode = `${Latitude},${Longitude}`;
          getReverseGeoCodeRegion(locCode).then((res: any) => {
            // console.log('res', res);

            if (res.address) {
              // console.log('res', res);
              newLoc = {
                location: {
                  address: res.address,
                  locationId: res.locationId,
                  locationType: res.locationType,
                  coords: res.coords
                }
              };

              //server call
              fbDatabase.ref(`${TypesToFirebaseGlobals.User_Root}/${user.id}`).update(newLoc, function (error: any) {
                if (error) {
                  // The write failed...
                  // console.log('error adding', error);
                  dispatch({
                    type: TypesOfActions.CURRENT_USER_GLOBAL_ERRORS,
                    payload: error
                  });
                } else {
                  // Data saved successfully!
                  // console.log('DATA SAVED SUCSESFULLY');
                  dispatch({
                    type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
                    payload: newLoc.location
                  });
                }
              });
            } else {
              // console.log('!!!!!res', res);
            }
          });
        },
        (error: any) => {
          // eslint-disable-next-line
          // console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        },
        { enableHighAccuracy: true }
      );
    } else {
      // console.log('user location ', user.location.address);

      newLoc = {
        location: {
          address: user.location.address,
          locationId: user.location.locationId,
          locationType: user.location.locationType,
          coords: {
            lat: +user.location.coords.lat,
            long: +user.location.coords.long
          }
        }
      };

      dispatch({
        type: TypesOfActions.CURRENT_USER_CHANGE_LOCATION,
        payload: newLoc.location
      });
    }
  };
};
