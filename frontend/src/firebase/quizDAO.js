import {GenericDAO} from "@/firebase/genericDAO";
import {collection,  getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/firebase";


export class QuizDAO extends GenericDAO {
    constructor() {
        super('quizzes');
    }

    async getQuiz(quizID) {
            const quizCollection = collection(db, 'quizzes');
            const q = query(quizCollection, where("quizID", "==", quizID));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length === 0) {
                return null;
            }

            const quizData = querySnapshot.docs[0].data();

            const quiz = {
              quizID: quizData.quizID,
              title: quizData.title,
              questions: quizData.questions,
            };
          
            console.log("quiz: ", quiz);
            return quiz;
    }
}
