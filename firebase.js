// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseApiKey } from "/.env.local";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "headstarterpantry.firebaseapp.com",
  projectId: "headstarterpantry",
  storageBucket: "headstarterpantry.appspot.com",
  messagingSenderId: "40970468910",
  appId: "1:40970468910:web:c7ef5a9f0525598c0c69bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
