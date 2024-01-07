import {db} from "@/firebase/firebase";
import {doc, getDoc, setDoc} from "firebase/firestore"
import {store} from "@/store";
import {CharacterDAO} from "@/firebase/characterDAO";
import {GenericDAO} from "@/firebase/genericDAO";


export class UserDAO extends GenericDAO {

    characterDAO = new CharacterDAO()
    constructor() {
        super('users');
    }

   async createUserDocument(userCredentials, additionalUserData) {
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
            await this.characterDAO.createCharacterDocument(userCredentials.user.uid, additionalUserData);

        } else {
            throw new Error('User already exists!');
        }
    }


    async storeUserObject(user) {

        if(!user || !user.uid) {
            store.user = null;
            localStorage.removeItem('user');
        } else {
            let newUser = await this.getById(user.uid);
            if (newUser == null) {
                newUser = {};
                newUser.email = user.email;
                newUser.uid = user.uid;
            }
            store.user = newUser;
            localStorage.setItem('user', JSON.stringify(newUser));
        }
        console.log('User changed to: ', store.user);

    }
}