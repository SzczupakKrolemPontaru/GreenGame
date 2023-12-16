<template>
  <div>
    <button @click="createNewSession">Create New Session</button>
    <button @click="joinSession">Join Session</button>
  </div>
  <div>
    <div v-for="session in sessions" :key="session.id">
      <div>
        <small>Session ID: {{ session.id }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import {sharedSessionManager} from "@/sessionManager";

export default {
  name: "LoginPage",
  data: () => ({
    sessions: [],
  }),
  methods: {
    createNewSession() {
      sharedSessionManager.createNewSession();
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
