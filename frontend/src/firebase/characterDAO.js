import {db} from "@/firebase/firebase";
import {collection, addDoc, getDocs, query, where} from "firebase/firestore";


export const createCharacterDocument = async (userUID, additionalUserData) => {
    if (!userUID || !additionalUserData) {
        return;
    }
    const {name} = additionalUserData;
    try {
        const docRef = await addDoc(collection(db, "characters"), {
            nickname: name,
            level: 1,
            expPoints: 0,
            hatID: 0,
            progressBoosted: false,
            userUID: userUID
        });
        console.log("Character saved with ID: ", docRef.id);
    } catch (e) {
        console.log('Error when creating character: ', e);
    }

}


export const getCharacterByUser = async (userUID) => {

    if(!userUID) {
        return null;
    } else {
        const characterCollection = collection(db, 'characters');
        const q = query(characterCollection, where("userUID", "==", userUID));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length === 0) {
            return null;
        }
        const character = querySnapshot.docs.at(0).data();
        console.log("Character: ", character);
        return character;

    }

}