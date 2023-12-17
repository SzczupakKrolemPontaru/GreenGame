import {initializeApp} from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";


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


export const getLoggedUser = () => {
    return auth.currentUser;
}

export const createUser = async (email, pass) => {

    return await createUserWithEmailAndPassword(auth, email, pass).catch((e) => {
        console.log('Create account error: ', e);
        throw e;
    });
}

export const signInUser = async (email, pass) => {

    return await signInWithEmailAndPassword(auth, email, pass).catch((e) => {
        console.log('SignIn error: ', e);
        throw e;
    });
}

export const logOutUser = async () => {
    return await signOut(auth).catch((e) => {
        console.log('SignOut error: ', e);
        throw e;
    });
}
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);


