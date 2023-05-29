/* AUTHENTICATION FUNCTIONS */

import { FIREBASE_AUTH, GOOGLE_PROVIDER } from '../../firebase/ConfigSetup';
import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential } from 'firebase/auth';

export function login(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
}

export function register(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
}

export function forgotPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(FIREBASE_AUTH, email, {
    // handleCodeInApp: true,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}auth/reset`,
  });
}

export function resetPassword(oobCode: string, newPassword: string) {
  return confirmPasswordReset(FIREBASE_AUTH, oobCode, newPassword);
}

export function logout() {
  signOut(FIREBASE_AUTH);
  window.location.replace('/');
}

export function logInWithGoogle() {
  return signInWithPopup(FIREBASE_AUTH, GOOGLE_PROVIDER);
}
