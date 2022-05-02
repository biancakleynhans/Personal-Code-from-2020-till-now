import React, { useEffect, useState } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { useAuth } from "../../hooks/AuthHook";
import Grided from "../../layout/Grided";

export default function AllUsers() {
  const [loading, setloading] = useState(false);

  const { AllUsers } = useAuth();

  useEffect(() => {
    console.log("ALL USERS", AllUsers);
  }, []);

  function displayOne() {
    return <></>;
  }
  function displayListOfAllUsers() {
    return (
      <>
        {AllUsers &&
          AllUsers.length > 0 &&
          AllUsers.map((user, index) => (
            <IonItem key={index}>
              <IonLabel class='ion-text-wrap'>{user.email}</IonLabel>
              <IonLabel class='ion-text-wrap'>{user.cart && user.cart.length ? user.cart.length : "No cart items"}</IonLabel>
              <IonLabel class='ion-text-wrap'>{user.orders && user.orders.length ? user.orders.length : "No orders items"}</IonLabel>
            </IonItem>
          ))}
      </>
    );
  }
  return <Grided addingJsx={displayOne()} displayEditList={displayListOfAllUsers()} header='All Users' loading={loading} />;
}
