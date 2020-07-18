  import firebase from "firebase/app";
  import 'firebase/database'; // If using Firebase database
  import 'firebase/storage';  // If using Firebase storage
  import "firebase/firestore";
  const devConfig = {
    apiKey: "AIzaSyDpPhqDRJrki-FBFlsl8R2lshe6fMhRTFI",
    authDomain: "react-login-app-dd19f.firebaseapp.com",
    databaseURL: "https://react-login-app-dd19f.firebaseio.com",
    projectId: "react-login-app-dd19f",
    storageBucket: "react-login-app-dd19f.appspot.com",
    messagingSenderId: "237316982047",
    appId: "1:237316982047:web:8585f2a62073b4c19e5c2a"
  };
  // Initialize Firebase
  firebase.initializeApp(devConfig);

  export default firebase;