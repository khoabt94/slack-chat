import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeXPg7gCddxFM4xcUGLlX0D_aJr4o9H4w",
  authDomain: "slack-clone-9d382.firebaseapp.com",
  projectId: "slack-clone-9d382",
  storageBucket: "slack-clone-9d382.appspot.com",
  messagingSenderId: "913391834441",
  appId: "1:913391834441:web:c591e312f18e607531f698",
  measurementId: "G-K6VWQP7B47",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
