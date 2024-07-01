// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTmTNFTOLoqHZ1CfQ8lzPys-cjR04uxOg",
  authDomain: "appanotalov1.firebaseapp.com",
  projectId: "appanotalov1",
  storageBucket: "appanotalov1.appspot.com",
  messagingSenderId: "973415493940",
  appId: "1:973415493940:web:4a02a0cad792781835f561"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;