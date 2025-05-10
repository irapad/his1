// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpyYYxhmn3YIr-zXfT1Vj5R07No4rmQgc",
  authDomain: "vueappp-c4df5.firebaseapp.com",
  projectId: "vueappp-c4df5",
  storageBucket: "vueappp-c4df5.appspot.com",
  messagingSenderId: "275119274555",
  appId: "1:275119274555:web:7f919853510e13a7843a1e",
  measurementId: "G-17EFBQ141T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { database, auth , storage };
