<template>
  <div class="game-tile">
    <img class="game-icon" src="" alt="Minigame Icon" @click="startGame"/>
    <Minigame ref="minigame"/>
    <Quiz ref="quiz"/>
    <div>
      <button @click="displayScoreboard = true">Display Scoreboard</button>
      <div v-if="displayScoreboard" class="modal">
        <div class="modal-content">
          <h2>Scoreboard</h2>
          {{updateScoreboard()}}
          <table>
            <thead>
              <tr>
                <th>Nick</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="score in scores" :key="score.playerID">
                <td>{{ score.playerID }}</td>
                <td>{{ score.score }}</td>
              </tr>
            </tbody>
          </table>
          <button @click="displayScoreboard = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'GameTile',
  data() {
    return {
      scores: [],
      userName: 'mockUserName',
      displayScoreboard: false
    }
  },
  components: {
    Minigame: {
      template: '<div>Mock Minigame</div>',
      data() {
        return {
          gameName: 'mockGameName',
          gameID: 'mockGameID',
        }
      }, 
      methods: {
        start(userName) {
          router.push(`/game/${this.gameID}`);
          // router.push({ name: 'Minigame', params: { gameID: this.gameID, userName: userName } });
          // trzeba wcześniej stworzyć route do minigame w index.js
          console.log(userName);
          console.log('Minigame started');
        },
      }
    },
    Quiz: {
      template: '<div>Mock Quiz</div>',
      data() {
        return {
          isFinished: true
        }
      }
    },
  },
  methods: {
    startGame() {
      if (this.$refs.quiz.isFinished) {
        this.$refs.minigame.start(this.userName);
      } else {
        this.displayMessage('Quiz is not finished yet!');
      }
    },

    // na razie tak, w przyszłosci z bazy pobierany plik json
    getScores() {
      return [
        {playerID: 'player1', score: 10},
        {playerID: 'player2', score: 20},
        {playerID: 'player3', score: 30},
      ];
    },

    updateScoreboard() {
      this.scores = this.getScores();
      this.scores.sort((a, b) => b.score - a.score);
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
.game-icon {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
