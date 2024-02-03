// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-bL-eLD28TrGhspS-SMcYCb6TbqtCndM",
  authDomain: "bookmate-4810c.firebaseapp.com",
  projectId: "bookmate-4810c",
  storageBucket: "bookmate-4810c.appspot.com",
  messagingSenderId: "996917489489",
  appId: "1:996917489489:web:0ffcd246015c0c7542ad70",
  measurementId: "G-E6TBZXPF7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
