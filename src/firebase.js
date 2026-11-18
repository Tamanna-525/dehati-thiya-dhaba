
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgQsgLnNbfe8r9bQprKZY_rGLqiFaNd-o",
  authDomain: "dehati-thiya-dhaba.firebaseapp.com",
  projectId: "dehati-thiya-dhaba",
  storageBucket: "dehati-thiya-dhaba.firebasestorage.app",
  messagingSenderId: "211023641596",
  appId: "1:211023641596:web:b1a3bf49a05f3fb08a1079",
  measurementId: "G-ETKL5NSG1C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;
