import {GenericDAO} from "@/firebase/genericDAO";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/firebase";


export class QuizDAO extends GenericDAO {
    constructor() {
        super('quizzes');
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


}