import {db} from "@/firebase/firebase";
import {doc, getDoc, setDoc} from "firebase/firestore"
import {store} from "@/store";

export const createUserDocument = async (userCredentials, additionalUserData) => {
    if (!userCredentials || !userCredentials.user) {
        return;
    }
    console.log(userCredentials);
    const userRef = doc(db, `users/${userCredentials.user.uid}`)


    const userSnapshot = await getDoc(userRef);

    if(!userSnapshot.exists()) {
        const {email} = userCredentials.user;
        const {name} = additionalUserData;

        try {
            await setDoc(userRef, {
                name,
                email,
                createdAt: new Date(),
            });
        } catch (e) {
            console.log('Error when creating user ', e);
        }
    } else {
        throw new Error('User already exists!');
    }
}

export const getUserDocument = async (user) => {

    if(!user || !user.uid) {
        store.user = null;
    } else {
        const userRef = doc(db, `users/${user.uid}`)
        const userSnapshot = await getDoc(userRef);

        if(!userSnapshot.exists()) {
            throw new Error('User account does not exist!');
        }
        console.log("Snapshot: ", userSnapshot.data());
        store.user = userSnapshot.data();
        store.user.uid = user.uid;
    }
    console.log('User changed to: ', store.user);

}