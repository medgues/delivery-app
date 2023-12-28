import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB13Zf5NJpay5TT8q432it_Zp1LOfdHBTI",
  authDomain: "restaurantapp-a3ab8.firebaseapp.com",
  databaseURL: "https://restaurantapp-a3ab8-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-a3ab8",
  storageBucket: "restaurantapp-a3ab8.appspot.com",
  messagingSenderId: "883227630475",
  appId: "1:883227630475:web:69ab50dc7b501bb739ed8e",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
