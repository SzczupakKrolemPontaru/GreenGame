// sessionManager.js
import {db} from "@/firebase/firebase";
import {onSnapshot, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";

class SessionManager {
    constructor() {
        this.sessions = [];
        this.unsubscribe = null;
    }

    createNewSession(player) {
        const players = [{
            name: player,
            score: 0, // Initial score is set to 0
        }];

        const newSession = {
            players: players,
            messages: [], // Array to store messages
        };

        return addDoc(collection(db, "sessions"), newSession)
            .then((docRef) => {
                console.log("New session created with ID:", docRef.id);
                return docRef.id; // Zwróć identyfikator nowo utworzonej sesji
            })
            .catch((error) => {
                console.error("Error creating new session:", error.message);
                throw error; // Rzuć błąd, aby obsługić go w wywołującym kodzie (jeśli to konieczne)
            });
    }

    joinSession(sessionId, player) {
        try {
            const sessionIndex = this.sessions.findIndex((session) => session.id === sessionId);

            if (sessionIndex !== -1) {
                // Found the session
                const currentSession = this.sessions[sessionIndex];
                const updatedSession = {
                    ...currentSession,
                    players: [...currentSession.players, player],
                };

                // Update the session in the sessions array
                this.sessions.splice(sessionIndex, 1, updatedSession);

                // Reference the document with the specified session ID
                const sessionDocRef = doc(db, "sessions", sessionId);

                // Update the document
                updateDoc(sessionDocRef, {
                    players: updatedSession.players,
                })
                    .then(() => {
                        console.log(`Player ${player} joined session with ID ${sessionId}`);
                    })
                    .catch((error) => {
                        console.error("Error joining session:", error.message);
                    });
            } else {
                console.error(`Session ID ${sessionId} not found`);
            }
        } catch (error) {
            console.error("Error joining session:", error.message);
        }
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

    updatePlayerScoreInSession(sessionId, playerName, newScore) {
        try {
            const sessionIndex = this.sessions.findIndex((session) => session.id === sessionId);

            if (sessionIndex !== -1) {
                // Found the session
                const currentSession = this.sessions[sessionIndex];

                // Find the player in the session's players array
                const playerIndex = currentSession.players.findIndex(player => player.name === playerName);

                if (playerIndex !== -1) {
                    // Found the player
                    currentSession.players[playerIndex].score = newScore;

                    // Update the session in the database (if needed)
                    updateDoc(doc(db, 'sessions', sessionId), { players: currentSession.players });

                    console.log(`Score updated for ${playerName} in Session ID ${sessionId}`);
                } else {
                    console.error(`Player "${playerName}" not found in Session ID ${sessionId}`);
                }
            } else {
                console.error(`Session ID ${sessionId} not found`);
            }
        } catch (error) {
            console.error("Error updating player score:", error.message);
        }
    }

    sendMessage(sessionId, messageContent, sender) {
        try {
            const sessionIndex = this.sessions.findIndex((session) => session.id === sessionId);

            if (sessionIndex !== -1) {
                // Found the session
                const currentSession = this.sessions[sessionIndex];
                currentSession.messages.push({
                    sender: sender, // You can customize the sender
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

            // Delete the document in the database
            deleteDoc(sessionDocRef)
                .then(() => {
                    console.log(`Session with ID ${sessionId} deleted successfully.`);

                    // Remove the session from the local sessions array
                    this.sessions = this.sessions.filter(session => session.id !== sessionId);
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
