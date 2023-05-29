import React, { useEffect, useState } from "react";
import { FIREBASE_MESSAGING, FIREBASE_VAPID_KEY } from "../../firebase/FirebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import { Base_User } from "../../models/UserModels";
import { useAuth } from "../../firebase/FirebaseContextAuth";

interface iProps {
  currU: Base_User;
}

export default function PushInApp(props: iProps) {
  const { updateUserFMC } = useAuth();
  const [pushToken, setpushToken] = useState("");
  const [allMsgs, setallMsgs] = useState<any[]>([]);

  useEffect(() => {
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.onBackgroundMessage` handler.
    onMessage(FIREBASE_MESSAGING, (payload) => {
      console.log("Message received. ", payload);
      // Update the UI to include the received message.
      let copy = [...allMsgs];
      copy.push(payload);
      setallMsgs(copy);

      let newMSG = JSON.stringify(payload, null, 2);
      console.log("Added new message", newMSG);
    });
  }, [pushToken, allMsgs]);

  function resetUI() {
    clearMessages();
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    getToken(FIREBASE_MESSAGING, { vapidKey: FIREBASE_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          sendTokenToServer();
          setpushToken(currentToken);
        } else {
          // Show permission request.
          console.log("No registration token available. Request permission to generate one.");
          // Show permission UI.
          requestPermission();
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  }

  // Send the registration token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer() {
    getToken(FIREBASE_MESSAGING, { vapidKey: FIREBASE_VAPID_KEY })
      .then((token) => {
        console.log("Sending token to server...", token, props.currU?.uid);
        setpushToken(token);
        updateUserFMC(props.currU.uid, token);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setpushToken("");
      });
  }

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.", props.currU?.fmcToken);
        setpushToken(props.currU?.fmcToken);
        sendTokenToServer();
        resetUI();
      } else {
        console.log("Unable to get permission to notify.", props.currU?.fmcToken);
      }
    });
  }

  function deleteToken() {
    // Delete registration token.
    setpushToken("");
    sendTokenToServer();
    // Once token is deleted update UI.
    resetUI();
    console.log("Token deleted");
  }

  // Clear the messages element of all children.
  function clearMessages() {
    setallMsgs([]);
    console.log("Cleared all message");
  }

  return (
    <>
      {pushToken.length === 0 && (
        <IonButton color='success' onClick={() => requestPermission()}>
          Register for Push Notifications
        </IonButton>
      )}
      {pushToken.length > 0 && (
        <IonButton color='danger' onClick={() => deleteToken()}>
          Unegister for Push Notifications
        </IonButton>
      )}
      <br />
      <IonList>
        {allMsgs.map((msg, index) => {
          console.log("?? MSG ??", msg);
          return (
            <IonItem key={index}>
              <IonLabel>MSG</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
