import { GenericDAO } from "@/firebase/genericDAO";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export class MinigameDAO extends GenericDAO {
  constructor() {
    super('minigames');
  }

async pushScore(minigameID, characterID, points) {
  const highscoresCollection = collection(db, 'highscores');
  try {
    const docRef = await addDoc(highscoresCollection, {
      minigameID: minigameID,
      characterID: characterID,
      points: points,
      date: Date.now()
    });
    console.log("Score saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error when saving score: ', e);
    throw e;
  }
}

}
