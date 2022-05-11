import React from "react";
import { IonBadge, IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonThumbnail, useIonPopover } from "@ionic/react";
import { cartOutline, closeOutline } from "ionicons/icons";
import { useAuth } from "./AuthHook";
import { RoutesObj } from "../routes/Routes";
import CartContent from "../components/reusable/CartContent";

const PopoverCart: React.FC<{ onHide: () => void }> = ({ onHide }) => {
  const { currentUser } = useAuth();

  return (
    <IonList>
      <IonListHeader>
        <IonLabel style={{ fontSize: "20px" }} color='tertiary'>
          Cart
        </IonLabel>
        <IonButton color='tertiary' onClick={onHide}>
          <IonIcon slot='icon-only' icon={closeOutline} />
        </IonButton>
      </IonListHeader>

      <IonItem>
        <IonThumbnail></IonThumbnail>
        <IonLabel style={{ textAlign: "center" }} color='medium'>
          Name
        </IonLabel>
        <IonLabel style={{ textAlign: "center" }} color='medium'>
          Price
        </IonLabel>
        <IonLabel style={{ textAlign: "center" }} color='medium'>
          QTY
        </IonLabel>
      </IonItem>

      {/* Cart Content  */}
      {currentUser && currentUser.cart && <CartContent arr={currentUser.cart} />}

      {/* BTNS BOTTOM */}
      <IonButton fill='outline' routerLink={RoutesObj.client.cart.path}>
        View Cart
      </IonButton>
      <IonButton color='danger' routerLink={RoutesObj.client.cart.path}>
        Check out now
      </IonButton>
    </IonList>
  );
};

export const CartPopUpHooked: React.FC = () => {
  const [present, dismiss] = useIonPopover(PopoverCart, { onHide: () => dismiss() });

  const { currentUser } = useAuth();

  return (
    <IonButton
      fill='clear'
      color='tertiary'
      onClick={(e) =>
        present({
          event: e.nativeEvent
        })
      }>
      <IonIcon size='large' icon={cartOutline} />
      <IonBadge style={{ "--padding-start": "-5px", "--padding-bottom": "16px", "--background": "none", "--color": "var(--ion-color-tertiary)", fontSize: "18px" }}>
        {currentUser?.cart?.length}
      </IonBadge>
    </IonButton>
  );
};
