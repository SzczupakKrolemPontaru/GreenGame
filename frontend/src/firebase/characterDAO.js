import {db} from "@/firebase/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";


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