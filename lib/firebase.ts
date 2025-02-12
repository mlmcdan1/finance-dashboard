import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYsW-PqktKpSllvoWogs698ZGp2iMyKlQ",
  authDomain: "finance-dashboard-99871.firebaseapp.com",
  projectId: "finance-dashboard-99871",
  storageBucket: "finance-dashboard-99871.appspot.com",
  messagingSenderId: "616113567725",
  appId: "1:616113567725:web:885fc5de5dce2f04c319e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
