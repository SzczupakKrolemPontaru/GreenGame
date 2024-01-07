import {GenericDAO} from "@/firebase/genericDAO";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/firebase";


export class HighscoreDAO extends GenericDAO {
    constructor() {
        super('highscores');
    }



    async getByCharacter(characterID) {

        if (!characterID) {
            return null;
        } else {
            const highscoresCollection = collection(db, this.collectionName);
            const q = query(highscoresCollection, where("characterID", "==", characterID));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length === 0) {
                return null;
            }
            // highscores posortowane od najwyższych wartości "points"
            const highscores = querySnapshot.docs.map(doc =>  doc.data()).sort((a, b) => {
                return a.points > b.points ? -1 : 1;
            });
            console.log("highscores by character: ", highscores);
            return highscores;

        }

    }

    async getByMinigame(minigameID) {

        if (!minigameID) {
            return null;
        } else {
            const highscoresCollection = collection(db, this.collectionName);
            const q = query(highscoresCollection, where("minigameID", "==", minigameID));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length === 0) {
                return null;
            }
            // highscores posortowane od najwyższych wartości "points"
            const highscores = querySnapshot.docs.map(doc =>  doc.data()).sort((a, b) => {
                return a.points > b.points ? -1 : 1;
            });
            console.log("highscores by minigame: ", highscores);
            return highscores;

        }

    }

    async getByBoth(characterID, minigameID) {

        if (!minigameID || !characterID) {
            return null;
        } else {
            const highscoresCollection = collection(db, this.collectionName);
            const q = query(highscoresCollection, where("minigameID", "==", minigameID),
                where("characterID", "==", characterID));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length === 0) {
                return null;
            }
            // highscores posortowane od najwyższych wartości "points"
            const highscores = querySnapshot.docs.map(doc =>  doc.data()).sort((a, b) => {
                return a.points > b.points ? -1 : 1;
            });
            console.log("highscores by both minigame and character: ", highscores);
            return highscores;

        }

    }

}
