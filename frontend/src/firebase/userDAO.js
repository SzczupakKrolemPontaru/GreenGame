import {db} from "@/firebase/firebase";
import {doc, getDoc, setDoc} from "firebase/firestore"
import {store} from "@/store";
import {createCharacterDocument} from "@/firebase/characterDAO";

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
        await createCharacterDocument(userCredentials.user.uid, additionalUserData);

    } else {
        throw new Error('User already exists!');
    }
}

export const getUserObject = async (userUID) => {

    if(!userUID) {
        return null;
    }
    const userRef = doc(db, `users/${userUID}`)
    const userSnapshot = await getDoc(userRef);
    if(!userSnapshot.exists()) {
        return null;
    }
    console.log("Snapshot: ", userSnapshot.data());
    const user = userSnapshot.data();
    user.uid = userUID;
    return user;

}

export const storeUserObject = async (user) => {

    if(!user || !user.uid) {
        store.user = null;
    } else {
        let newUser = await getUserObject(user.uid);
        if (newUser == null) {
            newUser = {};
            newUser.email = user.email;
            newUser.uid = user.uid;
        }
        store.user = newUser;
    }
    console.log('User changed to: ', store.user);

}