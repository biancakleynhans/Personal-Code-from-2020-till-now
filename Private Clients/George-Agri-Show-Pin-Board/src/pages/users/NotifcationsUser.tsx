import { IonCard, IonCardHeader } from "@ionic/react";
import PushInApp from "../../components/push/PushInApp";
import { useAuth } from "../../firebase/FirebaseContextAuth";

export default function NotifcationsUser() {
  const { currentUser } = useAuth();
  return (
    <IonCard>
      <IonCardHeader>Push Notifications</IonCardHeader>

      {currentUser !== null && <PushInApp currU={currentUser} />}
    </IonCard>
  );
}
