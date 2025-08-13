import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0pMMbd5YySqUCHWaQHmiP_9PJE_7hVd4",
  authDomain: "bawariya-samaj.firebaseapp.com",
  projectId: "bawariya-samaj",
  storageBucket: "bawariya-samaj.firebasestorage.app",
  messagingSenderId: "472444427549",
  appId: "1:472444427549:web:12ee364fb141ebdf9f95f4",
  measurementId: "G-PL64G0CVGV"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Helpers for phone auth
export function getRecaptcha(containerId="recaptcha-container"){
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, { size: "invisible" });
  }
  return window.recaptchaVerifier;
}
export { signInWithPhoneNumber, signOut, signInWithEmailAndPassword };
