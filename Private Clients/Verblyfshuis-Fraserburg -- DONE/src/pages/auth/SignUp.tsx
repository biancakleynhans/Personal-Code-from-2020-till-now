import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonCheckbox, IonTitle, IonToolbar, IonButton, IonLoading } from '@ionic/react';
import { AllRoutePaths } from '../../routes/Allroutes';
import HeaderComponent from '../../components/headersFooters/HeaderComponent';
import { useAuth } from '../../services/firebase/FirebaseAuthContext';

export default function SignUp() {
  const history = useHistory();
  const { register, createNewUser } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fName, setfName] = useState<string>('');
  const [lName, setlName] = useState<string>('');
  const [cell, setcell] = useState<string>('');
  const [agreeBtn, setAgreeBtn] = useState<boolean>(false);
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('Connecting to server please wait...');

  function submit() {
    // console.log("STATE", email, password, agreeBtn, isSubmitting);
    setisSubmitting(!isSubmitting);
    register(email, password)
      .then((res) => {
        console.log('RES Suscess', res);
        // DO firebase call to add user
        createNewUser(res.user.uid, res.user, { fn: fName, ln: lName, phone: cell, email: email });
        // setToastMsg("Sucsessfully registered as new client");
        // history.push(AllRoutePaths.BOOK);
      })
      .catch((err) => {
        console.log('ERROR', err.message);
        setToastMsg(err.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  }

  function disableSubmit() {
    if (email.length < 8 || password.length < 4 || !agreeBtn) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <HeaderComponent />

        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonTitle style={{ fontSize: '25px' }}>Account Info</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem lines='none'>
            {/* First name */}
            <IonLabel style={{ fontSize: '22px', padding: '11.5px' }} position='stacked'>
              First Name *
            </IonLabel>
            <IonInput required style={{ '--background': 'rgba(164,209,202,0.3)', '--color': 'black' }} value={fName} onIonChange={(e) => setfName(e.detail.value!)}></IonInput>
          </IonItem>
          {/* Last name */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: '22px', padding: '11.5px' }} position='stacked'>
              Last Name *
            </IonLabel>
            <IonInput required style={{ '--background': 'rgba(164,209,202,0.3)', '--color': 'black' }} value={lName} onIonChange={(e) => setlName(e.detail.value!)}></IonInput>
          </IonItem>
          {/* Phone number */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: '22px', padding: '11.5px' }} position='stacked'>
              Phone Number *
            </IonLabel>
            <IonInput required style={{ '--background': 'rgba(164,209,202,0.3)', '--color': 'black' }} value={cell} onIonChange={(e) => setcell(e.detail.value!)}></IonInput>
          </IonItem>
          {/* Email */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: '22.5px', padding: '11.5px' }} position='stacked'>
              Email *
            </IonLabel>
            <IonInput required style={{ '--background': 'rgba(164,209,202,0.3)', '--color': 'black' }} value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>
          {/* Password */}
          <IonItem lines='none'>
            <IonLabel style={{ fontSize: '22.5px', padding: '11.5px' }} position='stacked'>
              Password *
            </IonLabel>
            <IonInput required style={{ '--background': 'rgba(164,209,202,0.3)', '--color': 'black' }} value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          </IonItem>
          {/* T's and C's */}
          <IonItem lines='none'>
            <IonLabel class='ion-text-wrap'>
              I Agree to Webfusion Online's Privacy Policy & Terms of Service. Please review our{' '}
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href='http://' target='_blank' rel='noopener noreferrer'>
                Terms of Service.
              </a>
            </IonLabel>
            <IonCheckbox slot='start' checked={agreeBtn} onIonChange={(e: any) => setAgreeBtn(!agreeBtn)} />
          </IonItem>
          {/* Submit Button */}
          <IonButton color='primary' disabled={disableSubmit()} onClick={() => submit()}>
            Sign Up
          </IonButton>
        </IonList>

        <IonLoading
          // cssClass='my-custom-class'
          backdropDismiss={false}
          showBackdrop={true}
          animated={true}
          spinner='bubbles'
          isOpen={isSubmitting}
          onDidDismiss={() => setisSubmitting(false)}
          message={toastMsg}
          duration={25000}
        />
      </IonContent>
    </IonPage>
  );
}
