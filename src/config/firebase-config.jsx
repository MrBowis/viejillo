import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_KNZcUuUAEhw1GPaZNApEVpeOKQxEDhY",
  authDomain: "family-plan-20dcc.firebaseapp.com",
  projectId: "family-plan-20dcc",
  storageBucket: "family-plan-20dcc.firebasestorage.app",
  messagingSenderId: "506689118034",
  appId: "1:506689118034:web:31e0b68219b46ffbf5e48b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);