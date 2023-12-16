// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxtr3e5PRHSnzNBj0qDFC7-Pyzh3RQJXc",
    authDomain: "greengame-e3efe.firebaseapp.com",
    projectId: "greengame-e3efe",
    storageBucket: "greengame-e3efe.appspot.com",
    messagingSenderId: "735906179164",
    appId: "1:735906179164:web:621bdcd8f0de67398a9e99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);