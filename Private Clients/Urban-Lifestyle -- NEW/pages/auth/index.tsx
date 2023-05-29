/*
  BASE PAGE FOR AUTHENTICATION AND BASED ON DESIRED OPTION WILL HANDLE SAID AUTHENTICATION 
  DONE BY CALLING EACH AUTH TYPE AS A CONTAINED CHILD CREATED IN ITS OWN COMPONENT SPACE 
  THE AUTH FUNCTIONS ARE PASSED AS PROPS FROM THE BASE INDEX PAGE TO THE MATCHED CHILD AUTH COMPONENT 
*/

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AuthAlert from '../../components/shared/alerts/AuthAlert';
import ForgotPassword from '../../components/auth/ForgotPassword';
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import { UserTypes } from '../../constants/AppConstants';
import { CONTAINER_OUTER, GOOGLE_BTN, HEADER, INPUT, LABEL, SUBMIT_BTN } from '../../constants/Styling';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const { login, logInWithGoogle, forgotPassword, register, createUser } = useAuth();

  const [isSignIn, setisSignIn] = useState<boolean>(true);
  const [isSignUp, setisSignUp] = useState<boolean>(false);
  const [isForgot, setisForgot] = useState<boolean>(false);

  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('Connecting to server please wait...');

  const router = useRouter();

  function handleSubmit(email: string, pass: string, type: 'register' | 'login' | 'google') {
    if (type === 'register') {
      // // console.log('registering...', email, pass);
      setisSubmitting(true);
      setToastMsg('Connecting to server to create your account please wait');
      register(email, pass)
        .then((res) => {
          // console.log('RES', res, res.user.uid);
          createUser(
            res.user.uid,
            {
              email,
              cell: res.user.phoneNumber ? res.user.phoneNumber : '',
              company: '',
              fmcToken: '',
              fn: '',
              ln: '',
              adress: '',
              displayName: res.user.displayName ? res.user.displayName : '',
              profileUrl: res.user.photoURL ? res.user.photoURL : '',
              role: UserTypes.user,
              uid: res.user.uid,

              cart: [],
              orders: [],
              birthday: '',
              gender: '',
              wishlist: [],
            },
            { email, addr: '', cell: '', company: '', fmcToken: '', fn: '', ln: '', profileImg: '', birthday: '', gender: '' }
          )
            .then((res) => {
              // console.log('Created user sucesssfully');
              router.push('/');
            })
            .catch((err) => {
              // console.log('ERRROR CREATING USER', err);
            });
        })
        .catch((err) => {
          // console.log('ERRROR REGISTERING USER', err);
          setToastMsg(`ERRROR REGISTERING USER: ${err}`);
        });
    }

    if (type === 'google') {
      logInWithGoogle()
        .then((res) => {
          // console.log('RES', res, res.user.uid);
          createUser(
            res.user.uid,
            {
              email,
              cell: res.user.phoneNumber ? res.user.phoneNumber : '',
              company: '',
              fmcToken: '',
              fn: '',
              ln: '',
              adress: '',
              displayName: res.user.displayName ? res.user.displayName : '',
              profileUrl: res.user.photoURL ? res.user.photoURL : '',
              role: UserTypes.user,
              uid: res.user.uid,
              cart: [],
              orders: [],
              birthday: '',
              gender: '',
              wishlist: [],
            },
            { email, addr: '', cell: '', company: '', fmcToken: '', fn: '', ln: '', profileImg: '', birthday: '', gender: '' }
          )
            .then((res) => {
              // console.log('Created user sucesssfully');
              router.push('/');
            })
            .catch((err) => {
              // console.log('ERRROR CREATING USER', err);
            });
        })
        .catch((err) => {
          // console.log('ERRROR REGISTERING USER', err);
          setToastMsg(`ERRROR WITH GOOGLE AUTH: ${err}`);
        });
    }

    if (type === 'login') {
      setisSubmitting(true);
      setToastMsg('Connecting to server to log you into your account please wait');
      login(email, pass)
        .then((res) => {
          // console.log('RES', res, res.user.uid);
          // console.log('Logged in ');
          router.push('/');
        })
        .catch((err) => {
          // console.log('ERRROR LOGGING IN USER', err);
          setToastMsg(`ERRROR LOGGING USER: ${err}`);
        });
    }
  }

  function handleForgot(email: string) {
    forgotPassword(email)
      .then((res) => {
        // console.log('RES Suscess', res);
        setToastMsg('Email sent Sucesesfully, please check your');
      })
      .catch((err) => {
        // console.log('ERROR', err.message);
        setToastMsg(err.message);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  }

  function forgotSTATE() {
    setisSignIn(false);
    setisSignUp(false);
    setisForgot(true);
  }

  function createSTATE() {
    setisSignIn(false);
    setisForgot(false);
    setisSignUp(true);
  }

  function loginSTATE() {
    setisSignIn(true);
    setisForgot(false);
    setisSignUp(false);
  }

  return (
    <>
      {isSubmitting && (
        <AuthAlert
          alertText={toastMsg}
          showAlert={isSubmitting}
          onHandle={() => {
            setisSubmitting(false);
          }}
          styling={SUBMIT_BTN}
        />
      )}

      {isSignUp && (
        <SignUp
          UIheader={HEADER}
          UIcontainer={CONTAINER_OUTER}
          UIinput={INPUT}
          UIlabel={LABEL}
          UIsubmit={SUBMIT_BTN}
          handleSignIn={() => loginSTATE()}
          handleSignUp={(email, pass, type) => handleSubmit(email, pass, type)}
        />
      )}

      {isSignIn && (
        <SignIn
          UIheader={HEADER}
          UIcontainer={CONTAINER_OUTER}
          UIgoogle={GOOGLE_BTN}
          UIinput={INPUT}
          UIlabel={LABEL}
          UIsubmit={SUBMIT_BTN}
          handleSignUp={() => createSTATE()}
          handleForgot={() => forgotSTATE()}
          handleSignIn={(email, pass, type) => handleSubmit(email, pass, type)}
        />
      )}

      {isForgot && (
        <ForgotPassword
          UIheader={HEADER}
          UIcontainer={CONTAINER_OUTER}
          UIinput={INPUT}
          UIlabel={LABEL}
          UIsubmit={SUBMIT_BTN}
          handleSignIn={() => loginSTATE()}
          handleForgot={(email) => {
            handleForgot(email);
          }}
        />
      )}
    </>
  );
}
