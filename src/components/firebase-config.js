import { initializeApp } from "firebase/app";
import {browserLocalPersistence, getAuth} from 'firebase/auth';
import { getFirestore, doc, deleteDoc, getDocs, collection, onSnapshot, useCollectionData } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQegFdOHpFg_ArPjsujFnTc1qoHl-hQyk",
    authDomain: "auth-25cfe.firebaseapp.com",
    projectId: "auth-25cfe",
    storageBucket: "auth-25cfe.appspot.com",
    messagingSenderId: "720181007583",
    appId: "1:720181007583:web:80a5009b7ee23b50fd056a",
    measurementId: "G-J0J2QLYHCS"
  };
  
  // const app = initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);
 
  const auth = getAuth();
  const db = getFirestore();

  


  
 export {auth, db};