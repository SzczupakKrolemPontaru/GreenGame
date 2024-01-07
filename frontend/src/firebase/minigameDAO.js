import {GenericDAO} from "@/firebase/genericDAO";

export class MinigameDAO extends GenericDAO {
    constructor() {
        super('minigames');
    }
}