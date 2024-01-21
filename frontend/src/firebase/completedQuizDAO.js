import {GenericDAO} from "@/firebase/genericDAO";
import {db} from "@/firebase/firebase";
import {collection, getDocs, query, where, addDoc} from "firebase/firestore";

export class CompletedQuizDAO extends GenericDAO {
    constructor() {
        super('completedQuizzes');
    }
    async getCompletedQuizzesIDs(characterID) {
        if (!characterID) {
            return null;
        } else {
            const completedQuizzesCollection = collection(db, 'completedQuizzes');
            const q = query(completedQuizzesCollection, where("characterID", "==", characterID));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length === 0) {
                return null;
            }
            const completedQuizzesIDs = querySnapshot.docs.map(doc =>  doc.data().quizID);
            console.log("completedQuizzesIDs: ", completedQuizzesIDs);
            return completedQuizzesIDs;
        }
    }

    async pushCompletedQuizID(characterID, completionDate, quizID) {
            const completedQuizzesCollection = collection(db, 'completedQuizzes');

            const docRef = await addDoc(completedQuizzesCollection, {
                characterID: characterID,
                completionDate: completionDate,
                quizID: quizID
            });

            console.log("Dokument dodany z ID:", docRef.id);

            return docRef.id;
    }
}