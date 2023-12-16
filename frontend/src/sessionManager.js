// sessionManager.js
import {db} from "@/firebaseConfig";
import {onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";

class SessionManager {
    constructor() {
        this.sessions = [];
        this.unsubscribe = null;
    }

    createNewSession() {
        const players = ['Player1', 'Player2']; // You can customize player names or get them dynamically

        const newSession = {
            players: players,
            messages: [], // Array to store messages
        };

        addDoc(collection(db, "sessions"), newSession)
            .then((docRef) => {
                console.log("New session created with ID:", docRef.id);
            })
            .catch((error) => {
                console.error("Error creating new session:", error.message);
            });
    }

    subscribeToSessions(callback) {
        const sessionsQuery = collection(db, "sessions");
        this.unsubscribe = onSnapshot(sessionsQuery, (snapshot) => {
            this.sessions = snapshot.docs.map((doc) => {
                return {...doc.data(), id: doc.id};
            });

            if (typeof callback === "function") {
                callback(this.sessions);
            }
        });
    }

    sendMessage(sessionId, messageContent) {
        try {
            const sessionIndex = this.sessions.findIndex((session) => session.id === sessionId);

            if (sessionIndex !== -1) {
                // Found the session
                const currentSession = this.sessions[sessionIndex];
                currentSession.messages.push({
                    sender: 'Player1', // You can customize the sender
                    content: messageContent,
                });

                // Update the session in the database (if needed)
                updateDoc(doc(db, 'sessions', sessionId), {messages: currentSession.messages});

                console.log(`Message sent to Session ID ${sessionId}`);
            } else {
                console.error(`Session ID ${sessionId} not found`);
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    }

    deleteSession(sessionId) {
        try {
            // Reference the document with the specified session ID
            const sessionDocRef = doc(db, "sessions", sessionId);

            // Delete the document
            deleteDoc(sessionDocRef)
                .then(() => {
                    console.log(`Session with ID ${sessionId} deleted successfully.`);
                })
                .catch((error) => {
                    console.error("Error deleting session:", error.message);
                });
        } catch (error) {
            console.error("Error deleting session:", error.message);
        }
    }

    // Add a method to stop listening to sessions when needed
    stopListeningToSessions() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

// Create a single instance of SessionManager
const sharedSessionManager = new SessionManager();

export {sharedSessionManager};
