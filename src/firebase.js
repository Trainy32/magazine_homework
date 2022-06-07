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
  apiKey: "AIzaSyAVXGXlVOxuDqzb677EIIMwnXfp7zDsW4U",
  authDomain: "mymagazinepjt.firebaseapp.com",
  databaseURL: "https://mymagazinepjt-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mymagazinepjt",
  storageBucket: "mymagazinepjt.appspot.com",
  messagingSenderId: "510391132870",
  appId: "1:510391132870:web:364e91dcd41b840ce5adc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
export const database = getDatabase(app);

export default app