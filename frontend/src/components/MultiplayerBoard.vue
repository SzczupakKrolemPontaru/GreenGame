<template>
  <div>
    <div v-for="session in sessions" :key="session.id">
      <div>
        <small>Session ID: {{ session.id }}</small>
        <div v-for="player in session.players" :key="player.id">
          <p>Player: {{ player }}</p>
        </div>
        <div>
          <p>Messages:</p>
          <div v-for="message in session.messages" :key="message.id">
            <p>{{ message.sender }}: {{ message.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <button @click="createNewSession">Create New Session</button>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
import {sharedSessionManager} from "@/sessionManager";

export default {
  name: "MultiplayerBoard",
  data: () => ({
    sessions: [],
  }),
  methods: {
    createNewSession() {
      sharedSessionManager.createNewSession();
    },
    sendMessage() {
      sharedSessionManager.sendMessage('BeFw4gC3T6SPO80oq42g', 'Hello, Player 2!');
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
