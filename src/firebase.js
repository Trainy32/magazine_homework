// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNKxTNWs7DtGmBVTIkOQE5U2vVPdBymSs",
  authDomain: "sparta-react-basic-b15c2.firebaseapp.com",
  projectId: "sparta-react-basic-b15c2",
  storageBucket: "sparta-react-basic-b15c2.appspot.com",
  messagingSenderId: "381993601261",
  appId: "1:381993601261:web:8e221336691d0a386424e4",
  measurementId: "G-4S5HZR6XXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
export const database = getDatabase(app);

export default app