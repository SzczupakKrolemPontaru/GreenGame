import {db} from "@/firebase/firebase";
import {collection, addDoc, getDocs, query, where, Timestamp} from "firebase/firestore";
import {GenericDAO} from "@/firebase/genericDAO";
import {HighscoreDAO} from "@/firebase/highscoreDAO";



export class CharacterDAO extends GenericDAO {
    constructor() {
        super('characters');
    }

    highscoreDAO = new HighscoreDAO();


    async createCharacterDocument(userUID, additionalUserData) {
        if (!userUID || !additionalUserData) {
            return;
        }
        const {name} = additionalUserData;
        try {
            const docRef = await addDoc(collection(db, this.collectionName), {
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



    async getCharacterByUser(userUID) {

        if (!userUID) {
            return null;
        } else {
            const characterCollection = collection(db, this.collectionName);
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


    async markQuizAsCompleted(characterID, quizID) {
        if (!characterID || !quizID) {
            throw new Error('characterID and quizID are required');
        }

        const completedQuizzesCollection = collection(db, 'completedQuizzes');

        try {
            const completionDate = Timestamp.now(); // Get the current timestamp

            // Create a new document with characterID, quizID, and completionDate
            const docRef = await addDoc(completedQuizzesCollection, {
                characterID,
                quizID,
                completionDate,
            });

            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding completed quiz:', error);
            throw error;
        }
    }

    async setHighscore(characterID, minigameID, points) {

        const highscoreData = {
            characterID,
            minigameID,
            points,
            date: Timestamp.now()
        }
        const allCurrent = await this.highscoreDAO.getByBoth(characterID, minigameID);
        const bestCurrent = allCurrent[0];
        if (points > bestCurrent.points) {
            return await this.highscoreDAO.add(highscoreData);
        } else {
            console.log('Highscore not set, better score is already in the db')
            return null;
        }

    }
}