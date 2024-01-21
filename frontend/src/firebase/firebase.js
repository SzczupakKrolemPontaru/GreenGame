import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkqBoaE2sg3ZP17hpCiECx1xTrRpy9AFk",
    authDomain: "green-game-8eaa6.firebaseapp.com",
    projectId: "green-game-8eaa6",
    storageBucket: "green-game-8eaa6.appspot.com",
    messagingSenderId: "118384063141",
    appId: "1:118384063141:web:d5115cf279a3bf7e34134c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


