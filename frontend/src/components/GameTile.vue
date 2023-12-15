<template>
  <div class="game-tile" @click="startGame">
    <!-- <Minigame /> -->
    <!-- <Quiz /> -->
  </div>
</template>

<script>
// import Minigame from './Minigame.vue'
// import Quiz from './Quiz.vue'

// kuźwa ciężko cokolwiek napisać nie mając Quizu i Minigame
export default {
  name: 'GameTile',
  components: {
    // Minigame,
    // Quiz
  },
  data() {
    return {
      miniGame: {

      },
      quiz: {
        // idk
        isQuizFinished: false,
      },
    }
  },
  methods: {
    startGame(isQuizFinished) {
      // na razie tak
      if (isQuizFinished) {
      }
    },

    getScores(miniGame) {
      // na razie tak
      return miniGame.scores;
    },

    displayScoreboard() {

    },

    displayMessage() {

    },

    getQuizStatus(playerID, quiz) {
      // na razie tak
      return quiz.playerStatus[playerID];
    }
  }
}
</script>

<style scoped>
.game-tile {
  cursor: pointer;
}
</style>
