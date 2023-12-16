<template>
  <div>
    <div v-if="!loggedIn">
    <input v-model="credentials" type="text" placeholder="your username" />
    <button @click="login">Login</button>
    </div>
    <!-- Render these buttons only if loggedIn is true -->
    <div v-if="loggedIn">
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
  }),
  methods: {
    login() {
      this.username = this.credentials
      this.loggedIn = true;
    },
    createNewSession() {
      sharedSessionManager.createNewSession(this.username);
    },
    joinSession(sessionId) {
      sharedSessionManager.joinSession(sessionId, this.username);
    },
  },
  mounted() {
    sharedSessionManager.subscribeToSessions((sessions) => {
      this.sessions = sessions;
    });
  },
  // Make sure to stop listening when the component is destroyed
  beforeUnmount() {
    sharedSessionManager.stopListeningToSessions();
  },
};
</script>

<style>
</style>
