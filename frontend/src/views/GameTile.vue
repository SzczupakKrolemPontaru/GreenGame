<template>
  <div class="game-tile">
    <img class="game-icon" src="" alt="Minigame Icon" @click=""/>
    <Minigame ref="minigame"/>
    <Quiz ref="quiz"/>
    <div v-if="scores.length">
      <button @click="displayScoreboard">Display Scoreboard</button>
      <h2>Scoreboard</h2>
      <div v-for="score in scores" :key="score.playerID">
        <span>PlayerID: {{ score.playerID }},</span>
        <span>Score: {{ score.score }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// kuźwa ciężko cokolwiek napisać nie mając Quizu i Minigame
export default {
  name: 'GameTile',
  data() {
    return {
      scores: [],
    }
  },
  components: {
    Minigame: {
      template: '<div>Mock Minigame</div>',
      methods: {
        start() {
          console.log('Minigame started');
        },
      }
    },
    Quiz: {
      template: '<div>Mock Quiz</div>',
      data() {
        return {
          isFinished: false
        }
      }
    },
  },
  methods: {
    startGame() {
      if (this.$refs.quiz.isFinished) {
        this.$refs.minigame.start();
      } else {
        this.displayMessage('Quiz is not finished yet!');
      }
    },

    // na razie tak
    getScores() {
      return [
        {playerID: 'player1', score: 10},
        {playerID: 'player2', score: 20},
        {playerID: 'player3', score: 30},
      ];
    },

    displayScoreboard() {
      this.scores = this.getScores();
    },

    // na razie tak
    displayMessage(message) {
      console.log(message);
    },
  }
}
</script>

<style scoped>
.game-tile {
  cursor: pointer;
}
</style>
