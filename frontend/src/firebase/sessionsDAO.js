import {GenericDAO} from "@/firebase/genericDAO";


export class SessionsDAO extends GenericDAO {
    constructor() {
        super('sessions');
    }
}
