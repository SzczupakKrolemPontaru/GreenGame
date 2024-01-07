import {GenericDAO} from "@/firebase/genericDAO";

export class CompletedQuizDAO extends GenericDAO {
    constructor() {
        super('completedQuizzes');
    }
}