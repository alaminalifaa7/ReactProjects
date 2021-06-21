import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyC1LbrAng8ghm2788MSMe87JO0Mp6eWEdQ",
    authDomain: "mychat-fda00.firebaseapp.com",
    projectId: "mychat-fda00",
    storageBucket: "mychat-fda00.appspot.com",
    messagingSenderId: "984112890561",
    appId: "1:984112890561:web:bcbab4ceb37f6f072c8a40",
  })
  .auth();
