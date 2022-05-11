import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonThumbnail, IonTitle, IonToggle } from "@ionic/react";
import FooterBar from "../../../components/headersFooters/FooterBar";
import HeaderBar from "../../../components/headersFooters/HeaderBar";
import PageHeader from "../../../components/headersFooters/PageHeader";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useAuth } from "../../../hooks/AuthHook";
import Empty from "../../../assets/images/empty.png";
import AddEditProfile from "../../../components/Forms/AddEditProfile";
import AddEditAdress from "../../../components/Forms/AddEditAdress";
import { iAdress, iInfoBase, iUpdateProfile } from "../../../models/Basic";
import { UpdateUserProfile } from "../../../firebase/FirebaseFirestore";
import { RoutesObj } from "../../../routes/Routes";
import UserOrders from "./UserOrders";
import { LogoutAction } from "../../../firebase/FirebaseAuth";

export default function UserDash() {
  const [showMore, setshowMore] = useState<boolean>(false);
  // Diffrent subPages:
  const [editProfile, seteditProfile] = useState<boolean>(false);
  const [adressbook, setadressbook] = useState<boolean>(false);
  const [wishlist, setwishlist] = useState<boolean>(false);
  const [orders, setorders] = useState<boolean>(false);

  // Forms
  const [checked, setchecked] = useState<boolean>(false); //push notifications
  const [defaultProfile, setdefaultProfile] = useState<iUpdateProfile | null>(null);

  // Info
  const { currentUser } = useAuth();

  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  useEffect(() => {
    if (currentUser && defaultProfile === null) {
      let temp: iUpdateProfile = {
        birthday: currentUser.birthday,
        cell: currentUser.cell,
        email: currentUser.email,
        gender: currentUser.gender,
        id: currentUser.id,
        name: currentUser.name
      };

      setdefaultProfile(temp);
    }
  }, [currentUser]);

  function displayDefault() {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonTitle color='secondary'>Hi {currentUser?.name}</IonTitle>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel class='ion-text-wrap'>
              From your My Profile Dashboard you have the ability to view a snapshot of your recent profile activity and update your profile information. Select a link on the left to view or
              edit information.
            </IonLabel>
          </IonCol>
        </IonRow>

        <IonRow className='ion-align-items-center'>
          <IonCol size={mQuery && mQuery.matches ? "3" : "12"}>
            <IonTitle color='secondary'>Recent orders</IonTitle>
          </IonCol>

          <IonCol>
            {currentUser && currentUser.orders && currentUser.orders.length > 0 ? (
              <>Display order most recent</>
            ) : (
              <>
                <img style={{ maxWidth: "100px", height: "100px" }} src={Empty} alt='No orders found' />
                <p>No orders found</p>
              </>
            )}
          </IonCol>

          <IonCol>
            <IonButton
              onClick={() => {
                setorders(!orders);
                setadressbook(false);
                setwishlist(false);
                seteditProfile(false);
              }}
              fill='outline'>
              View All
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow className='ion-align-items-center'>
          <IonCol size={mQuery && mQuery.matches ? "3" : "12"}>
            <IonTitle color='secondary'>Shipping Info</IonTitle>
          </IonCol>

          {currentUser && currentUser.adressBook && currentUser.adressBook.postalCode?.length > 0 ? (
            <IonCol>
              <IonLabel>
                {currentUser.adressBook.number} <br />
                {currentUser.adressBook.street}
                {currentUser.adressBook.suburb} <br />
                {currentUser.adressBook.city} <br />
                {currentUser.adressBook.province} <br />
                {currentUser.adressBook.country} <br />
                {currentUser.adressBook.postalCode} <br />
              </IonLabel>
            </IonCol>
          ) : (
            <IonCol>
              <IonLabel>You have not set a default shipping address.</IonLabel> <br />
            </IonCol>
          )}

          <IonCol>
            <IonButton
              fill='outline'
              onClick={() => {
                setadressbook(!adressbook);
                seteditProfile(false);
                setwishlist(false);
                setorders(false);
              }}>
              Add now
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow className='ion-align-items-center'>
          <IonCol size={mQuery && mQuery.matches ? "3" : "12"}>
            <IonTitle color='secondary'>Notifications</IonTitle>
          </IonCol>

          <IonCol>
            <IonLabel>Subcribe to notifications</IonLabel>
          </IonCol>

          <IonCol>
            <IonToggle checked={checked} onIonChange={(e) => setchecked(e.detail.checked)} />
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  function displayWishList() {
    return (
      <IonList>
        <IonListHeader>Wishlist</IonListHeader>
      </IonList>
    );
  }

  function submitEditProfile(update: iUpdateProfile) {
    console.log("UPDATE", update);
    if (currentUser) {
      UpdateUserProfile(currentUser.uid, update, null).then(() => {
        window.alert("Sucsesfully updated");
        setdefaultProfile(update);
      });
    }
  }

  function submitAdressBook(update: iAdress) {
    console.log("UPDATE", update);
    if (currentUser) {
      UpdateUserProfile(currentUser.uid, null, update).then(() => {
        window.alert("Sucsesfully updated");
      });
    }
  }

  return (
    <IonPage>
      <HeaderBar />
      <IonContent fullscreen>
        <PageHeader header='Dashboard' />
        <IonGrid>
          <IonRow>
            <IonCol size={mQuery && mQuery.matches ? "4" : "12"}>
              <IonList color='none' lines='none'>
                <IonItem>
                  <IonButton
                    fill='clear'
                    onClick={() => {
                      seteditProfile(false);
                      setadressbook(false);
                      setwishlist(false);
                      setorders(false);
                    }}>
                    Dashboard
                  </IonButton>
                </IonItem>
                <IonItem>
                  <IonButton fill='clear' onClick={() => setshowMore(!showMore)}>
                    My Profile
                    <IonIcon style={{ margin: "5px" }} color='primary' icon={!showMore ? chevronDownOutline : chevronUpOutline} />
                  </IonButton>
                </IonItem>
                {showMore && (
                  <div style={{ paddingLeft: "20px" }}>
                    <IonItem>
                      <IonButton
                        fill='clear'
                        onClick={() => {
                          seteditProfile(!editProfile);
                          setadressbook(false);
                          setwishlist(false);
                          setorders(false);
                        }}>
                        Profile Details
                      </IonButton>
                    </IonItem>
                    <IonItem>
                      <IonButton
                        fill='clear'
                        onClick={() => {
                          setadressbook(!adressbook);
                          seteditProfile(false);
                          setwishlist(false);
                          setorders(false);
                        }}>
                        Adress book
                      </IonButton>
                    </IonItem>
                  </div>
                )}
                <IonItem>
                  <IonButton
                    fill='clear'
                    onClick={() => {
                      setorders(!orders);
                      setadressbook(false);
                      setwishlist(false);
                      seteditProfile(false);
                    }}>
                    My Orders
                  </IonButton>
                </IonItem>
                {/* <IonItem>
                  <IonButton
                    fill='clear'
                    onClick={() => {
                      setwishlist(!wishlist);
                      setadressbook(false);
                      seteditProfile(false);
                      setorders(false);
                    }}>
                    Wishlist
                  </IonButton>
                </IonItem> */}

                <IonItem>
                  <IonButton fill='clear' routerLink={RoutesObj.client.cart.path}>
                    Cart
                  </IonButton>
                </IonItem>
                {currentUser !== null && (
                  <IonItem>
                    <IonButton onClick={() => LogoutAction()} color='secondary' fill='clear'>
                      <IonLabel>Sign Out</IonLabel>
                    </IonButton>
                  </IonItem>
                )}
              </IonList>
            </IonCol>

            <IonCol>
              {/* Default screen */}
              {!editProfile && !adressbook && !wishlist && !orders && displayDefault()}

              {editProfile && <AddEditProfile onSub={(update: iUpdateProfile) => submitEditProfile(update)} default={defaultProfile ? defaultProfile : ({} as iUpdateProfile)} />}

              {adressbook && <AddEditAdress onSub={(up: iAdress) => submitAdressBook(up)} default={currentUser?.adressBook ? currentUser.adressBook : ({} as iAdress)} />}

              {orders && <UserOrders curr={currentUser ? currentUser : ({} as iInfoBase)} />}

              {wishlist && displayWishList()}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <FooterBar />
    </IonPage>
  );
}
