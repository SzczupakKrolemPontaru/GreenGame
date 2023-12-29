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
          <text>ID sesji: {{ session.id }}</text><br/>
          <text>Gracze:</text>
          <div v-for="player in session.players" :key="player.name">
            <text>{{ player.name }}</text>
          </div>
          <button @click="joinSession(session.id)" class="btn btn-info">Dołącz do sesji</button>
        </div>
      </div>
    </div>
    <div v-if="loggedIn && currentSessionId !== null" class = "multiplayer_panel">
      <h1>czat</h1>
      <div v-for="session in sessions" :key="session.id" class="chat">
        <div v-if="session.id === currentSessionId">
          <div v-for="message in session.messages" :key="message.id">
            <div :class = "{ 'sender': message.sender === username, 'receiver': message.sender !== username }">{{ message.sender }}</div>
            <div :class = "{ 'sent-message': message.sender === username, 'received-message': message.sender !== username }">{{ message.content }}</div>
          </div>
        </div>
      </div>
      <button @click="displayEmotes" class="btn btn-primary mt-3">😊</button>
      <button @click="sendMessage" class="btn btn-primary mt-3">Wyślij wiadomość</button>
      <input v-model="toSend" type="text" placeholder="your message" class="form-control mt-2" />
      <button @click="startGame" class="btn btn-success mt-3">Rozpocznij grę</button>
      <div v-if="show_emotes" class="emote_table">
        <div class="row">
          <div v-for="(emote) in emotes" :key="emote" class="col-3 col-md-2">
            <button @click="addEmote(emote)" class="btn btn-primary mt-2">{{ emote }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.start" class = "game">
    <miniGame v-on:updateScore="updateCurrentScore" />
    <div class="otherScore">
      <p>Wynik drugiego gracza: {{ displayOtherPlayerScore }}</p>
    </div>
  </div>
</template>


<script>
import { sharedSessionManager } from "@/multiplayer";
import miniGame from "@/components/MiniGame.vue";
import * as emoji from 'node-emoji'
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
    toSend: "",
    currentSessionId: null,
    start: false,
    show_emotes: false,
    emotes:[
      "😊", "😎", "😍", "🥳", "🤩", "😜", "🤔", "😇", "🙌", "🎉",
      "🌈", "🌟", "💖", "👏", "🔥", "💯", "✨", "🚀", "🎈", "🎊",
      "💪", "🤗", "😂", "😹", "👻", "🤖", "🐱", "🐶", "🦄", "🐒",
      "😀", "😃", "😄", "😁", "😅", "😆", "😂", "🤣", "😊", "😇",
      "😍", "🥰", "😘", "😗", "😙", "😚", "☺️", "🙂", "🤗", "🤩",
      "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😌", "😔", "😪"
    ],

  }),
  computed: {
    displayOtherPlayerScore() {
      return this.otherPlayerScore;
    },
  },
  methods: {
    displayEmotes(){
      this.show_emotes = !this.show_emotes;
    },
    addEmote(emote){
      this.toSend += emote;
    },
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
        const processed_message = emoji.emojify(this.toSend);
        await sharedSessionManager.sendMessage(
            this.currentSessionId,
            processed_message,
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
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
}
.multiplayer_panel{
  height: 90%;
  width: 20%;
  position: fixed;
  left: 80%;
  overflow-y: auto; /* Add this line to enable vertical scrolling */
  background: #ffffff;
}

.chat {
  background: #6a6977;
  border-style: solid;
}
.sender {
  font-size: 20px;
  font-weight: bold;
  color: #e7f0fd;
  text-align: left;
}
.receiver {
  font-size: 20px;
  font-weight: bold;
  color: #e7f0fd;
  text-align: left;
}
.sent-message {
  width: fit-content;
  height: fit-content;
  padding: 10px;
  font-size: 20px;
  background-color: rgba(86, 244, 23, 1);
  background-image: linear-gradient(38deg, rgba(86, 244, 23, 1) 8%, rgba(9, 244, 248, 1) 83%);
  color: #ffffff;
  border-radius: 10px; /* Adjust the radius as needed */
}

.received-message {
  width: fit-content;
  height: fit-content;
  padding: 10px;
  font-size: 20px;
  background-color: rgba(244, 115, 23, 1);
  background-image: linear-gradient(38deg, rgba(244, 115, 23, 1) 8%, rgba(248, 209, 9, 1) 83%);
  color: #ffffff;
  border-radius: 10px;
}
.game{
  height: 100%;
  width: 80%;
  position: fixed;
  left: 0;
}
</style>