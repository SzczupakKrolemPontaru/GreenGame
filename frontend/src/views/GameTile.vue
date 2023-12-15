<template>
  <div class="game-tile">
    <img class="game-icon" src="" alt="Minigame Icon" @click="displayGameInfo"/>
  </div>
</template>

<script>
// kuźwa ciężko cokolwiek napisać nie mając Quizu i Minigame
export default {
  name: 'GameTile',
  methods: {
    startGame() {
    },

    getScores() {
    },

    displayGameInfo() {
    },

    displayScoreboard() {

    },

    displayMessage() {

    },

    getQuizStatus() {
    }
  }
}
</script>

<style scoped>
.game-tile {
  cursor: pointer;
}
</style>
