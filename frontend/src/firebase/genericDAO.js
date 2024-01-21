import {db} from "@/firebase/firebase";
import {doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc} from "firebase/firestore"

export class GenericDAO {
    constructor(collectionName) {
        this.db = db;
        this.collectionName = collectionName;
    }

    async getAll() {
        const querySnapshot = await getDocs(collection(this.db, this.collectionName));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const docRef = doc(this.db, this.collectionName, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            return null;
        }
    }

    async add(item) {
        const docRef = await addDoc(collection(this.db, this.collectionName), {
            ...item
        });

        const newItem = await this.getById(docRef.id);
        if (newItem) {
            return newItem;
        } else {
            throw new Error('Failed to retrieve the newly added item.');
        }
    }

    async update(id, updates) {
        const docRef = doc(this.db, this.collectionName, id);
        await updateDoc(docRef, updates);

        const updatedItem = await this.getById(id);
        if (updatedItem) {
            return updatedItem;
        } else {
            throw new Error('Failed to retrieve the updated item.');
        }
    }

    async delete(id) {
        try {
            const docRef = doc(this.db, this.collectionName, id);
            const response = await deleteDoc(docRef);
            console.log(response);
            return true;
        } catch (error) {
            console.error('Error deleting document:', error);
            return false;
        }
    }
}