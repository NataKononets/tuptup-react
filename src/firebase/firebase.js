import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6nPhKPd6OkwepzSlnHPO41YNXYiVlipM",
  authDomain: "tup-tup-shop.firebaseapp.com",
  projectId: "tup-tup-shop",
  storageBucket: "tup-tup-shop.firebasestorage.app",
  messagingSenderId: "89601565536",
  appId: "1:89601565536:web:2106fa359493e26b8a7405",
  measurementId: "G-WBD257MSSY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
