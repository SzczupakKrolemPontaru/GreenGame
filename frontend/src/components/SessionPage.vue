<template>
  <div class="standard_text" v-if="!start">
    <div v-if="!loggedIn">
      <h1>Żeby grać w trybie multiplayer musisz być zalogowany !</h1>
      <button @click="login" class="btn btn-primary">Zaloguj</button>
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
  </div>
  <div v-if="!start &&loggedIn && currentSessionId !== null">
    <button @click="startGame" class="start_button">Rozpocznij grę</button>
  </div>
  <div v-if="this.start" class = "game">
    <miniGame v-on:updateScore="updateCurrentScore" />
  </div>
  <div v-if="loggedIn && currentSessionId !== null" class = "multiplayer_panel">
    <div v-if="this.start" class = "otherScore">
      <p>Wynik drugiego gracza: {{ displayOtherPlayerScore }}</p>
    </div>
    <h1>czat</h1>
    <div v-for="session in sessions" :key="session.id">
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
    <div v-if="show_emotes" class="emote_table">
      <div class="row">
        <div v-for="(emote) in emotes" :key="emote" class="col-3 col-md-2">
          <button @click="addEmote(emote)" class="btn btn-primary mt-2">{{ emote }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { sharedSessionManager } from "@/multiplayer";
import miniGame from "@/components/MiniGame.vue";
import * as emoji from 'node-emoji'
import {store} from "@/store";
import router from "@/router";
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
      router.push('/Login')
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
    if (store.user !== null) {
      this.username = store.user.name;
      this.loggedIn = true;
    }
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
.start_button{
  font-size: 50px;
  font-weight: bold;
  background-color: rgb(244, 23, 49);
  background-image: linear-gradient(38deg, rgb(244, 23, 41) 8%, rgb(248, 172, 9) 83%);
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 45%;
  left: 40%;
  border-radius: 30px;
}
.otherScore {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
}
.multiplayer_panel{
  height: 100%;
  width: 20%;
  position: fixed;
  left: 80%;
  overflow-y: auto;

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