import {GenericDAO} from "@/firebase/genericDAO";
import {collection, getDocs, query, where} from "firebase/firestore";
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


            const quiz =  this.mapFirestoreDocument(querySnapshot);

            return quiz;
    }

    async mapQuestion(question) {
        return {
            text: question.question,
            answers: question.answers,
            correctAnswerIndex: question.correctId,
        };
    }

     async mapFirestoreDocument(document) {
        const mappedDocument = {
            quizID: document.quizID,
            QuizTitle: document.title,
            questions: document.questions.map(this.mapQuestion)
        };

        return mappedDocument;
    }
}