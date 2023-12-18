import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "@/firebase/firebase";

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