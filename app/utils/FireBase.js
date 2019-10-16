import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCpOdBrR0RmNG2TZJVCadaOYyIegkYhYRM",
  authDomain: "tenedores-21f36.firebaseapp.com",
  databaseURL: "https://tenedores-21f36.firebaseio.com",
  projectId: "tenedores-21f36",
  storageBucket: "tenedores-21f36.appspot.com",
  messagingSenderId: "499768466092",
  appId: "1:499768466092:web:158cb709d241f7cbf0dd09"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
   