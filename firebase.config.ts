import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBl7vR5Ht5RT2gSAd8SVHyVEc1oepR8Jys",
  authDomain: "ehr-blockchain-9d6db.firebaseapp.com",
  projectId: "ehr-blockchain-9d6db",
  storageBucket: "ehr-blockchain-9d6db.appspot.com",
  messagingSenderId: "390352803220",
  appId: "1:390352803220:web:850c450cbf2b2329162b81",
  measurementId: "G-KCJP4VXHSG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
