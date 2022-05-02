import { IonCard, IonCardHeader } from "@ionic/react";
import PushInApp from "../../components/push/PushInApp";
import { useAuth } from "../../firebase/FirebaseContextAuth";
import { Base_User } from "../../models/UserModels";

export default function NotifcationsAdmin() {
  const { currentUser } = useAuth();
  return (
    <IonCard>
      <IonCardHeader>Push Notifications</IonCardHeader>

      {currentUser !== null && <PushInApp currU={currentUser} />}
    </IonCard>
  );
}
