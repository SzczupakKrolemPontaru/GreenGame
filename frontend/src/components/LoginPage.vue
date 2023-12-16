<template>
  <div>
    <div v-if="!loggedIn">
    <input v-model="credentials" type="text" placeholder="your username" />
    <button @click="login">Login</button>
    </div>
    <div v-if="loggedIn && currentSessionId === null">
      <header>Welcome {{this.username}}</header>
      <button @click="createNewSession">Create New Session</button>
      <div v-for="session in sessions" :key="session.id">
        <div>
          <small>Session ID: {{ session.id }}</small>
          <small>Players: {{ session.players.length }}  </small>
          <button @click="joinSession(session.id)">Join Session</button>
        </div>
      </div>
    </div>
    <div v-if="loggedIn && currentSessionId !== null">
      <div v-for="session in sessions" :key="session.id">
        <div v-if="session.id === currentSessionId">
          <p>Messages for Session ID {{ currentSessionId }}:</p>
          <div v-for="message in session.messages" :key="message.id">
            <p>{{ message.sender }}: {{ message.content }}</p>
          </div>
        </div>
      </div>
      <button @click="sendMessage">Send Message</button>
      <input v-model="toSend" type="text" placeholder="your message" />
    </div>
  </div>
</template>

<script>
import { sharedSessionManager } from "@/sessionManager";

export default {
  name: "LoginPage",
  data: () => ({
    sessions: [],
    username: "", // Added username property
    loggedIn: false, // Added loggedIn property
    currentSessionId: null,
  }),
  methods: {
    login() {
      this.username = this.credentials
      this.loggedIn = true;
    },
    async createNewSession() {
      try {
        this.currentSessionId = await sharedSessionManager.createNewSession(
            this.username
        );
      } catch (error) {
        console.error("Error creating new session:", error.message);
      }
    },
    joinSession(sessionId) {
      sharedSessionManager.joinSession(sessionId, this.username);
      this.currentSessionId = sessionId;
    },
    async sendMessage() {
      try {
        await sharedSessionManager.sendMessage(
            this.currentSessionId,
            this.toSend,
            this.username
        );
        this.toSend = "";
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    },
  },
  mounted() {
    sharedSessionManager.subscribeToSessions((sessions) => {
      this.sessions = sessions;
    });
  },
  // Make sure to stop listening when the component is destroyed
  beforeUnmount() {
    sharedSessionManager.deleteSession(this.currentSessionId)
    sharedSessionManager.stopListeningToSessions();
  },
};
</script>

<style>
</style>
