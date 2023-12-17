<template>
  <div class="standard_text" v-if="!start">
    <div v-if="!loggedIn">
      <input v-model="credentials" type="text" placeholder="twój nick" />
      <button @click="login" class="btn btn-primary">Graj</button>
    </div>
    <div v-if="loggedIn && currentSessionId === null">
      <div class ="header_class"><header>Witaj {{ this.username }} !</header></div>
      <button @click="createNewSession" class="btn btn-success">Stwórz nową sesję</button>
      <div v-for="session in sessions" :key="session.id" class="card mt-3">
        <div class="card-body">
          <text>Session ID: {{ session.id }}</text><br/>
          <text>Players:</text>
          <div v-for="player in session.players" :key="player.name">
            <text>{{ player.name }}</text>
          </div>
          <button @click="joinSession(session.id)" class="btn btn-info">Dołącz do sesji</button>
        </div>
      </div>
    </div>
    <div v-if="loggedIn && currentSessionId !== null">
      <div v-for="session in sessions" :key="session.id">
        <div v-if="session.id === currentSessionId">
          <p class="mt-3">Messages for Session ID {{ currentSessionId }}:</p>
          <div v-for="message in session.messages" :key="message.id">
            <p>{{ message.sender }}: {{ message.content }}</p>
          </div>
        </div>
      </div>
      <button @click="sendMessage" class="btn btn-primary mt-3">Wyślij wiadomość</button>
      <input v-model="toSend" type="text" placeholder="your message" class="form-control mt-2" />
      <button @click="startGame" class="btn btn-success mt-3">Rozpocznij grę</button>
    </div>
  </div>
  <div v-if="this.start">
    <miniGame v-on:updateScore="updateCurrentScore" />
    <div class="otherScore">
      <p>Other player score: {{ displayOtherPlayerScore }}</p>
    </div>
  </div>
</template>


<script>
import { sharedSessionManager } from "@/multiplayer";
import miniGame from "@/components/MiniGame.vue";
export default {
  components: {
    miniGame,
  },
  name: "LoginPage",
  data: () => ({
    otherPlayerScore: 0,
    sessions: [],
    username: "",
    loggedIn: false,
    currentSessionId: null,
    start: false,
  }),
  computed: {
    displayOtherPlayerScore() {
      return this.otherPlayerScore;
    },
  },
  methods: {
    startGame() {
      this.start = true;
    },
    async updateCurrentScore(actions) {
      this.currentScore = actions;
      sharedSessionManager.updatePlayerScoreInSession(this.currentSessionId,this.username, this.currentScore);
    },
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
      this.unsubscribePlayerScore = sharedSessionManager.listenToPlayerScore(
          this.currentSessionId,
          this.username,
          (score) => {
            this.otherPlayerScore = score;
          }
      );
    },
    joinSession(sessionId) {
      sharedSessionManager.joinSession(sessionId, this.username);
      this.currentSessionId = sessionId;

      this.unsubscribePlayerScore = sharedSessionManager.listenToPlayerScore(
          this.currentSessionId,
          this.username,
          (score) => {
            this.otherPlayerScore = score;
          }
      );
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
    sharedSessionManager.stopListeningToSessions();
  },
};
</script>

<style>
.header_class {
  font-size: 50px;
  font-weight: bold;
}
.standard_text {
  font-size: 25px;
}

.otherScore {
  font-size: 50px;
  font-weight: bold;
  background: #2c3e50;
  color: #fff; /* Kolor tekstu na tle niebieskiego /
  padding: 10px; / Dodatkowy odstęp wewnątrz elementu dla lepszego wyglądu */
  position: fixed;
  top: 0;
  right: 0;
}
</style>