<template>
  <div class="game-tile">
    <div class="game-container" @click="startGame" >
      <img class="game-icon" v-if="gameIcon" :src="gameIcon" alt="Game Icon" />
      <h2 class="game-title" v-else>{{ gameName }}</h2>
    </div>
    <Minigame ref="minigame"/>
    <Quiz ref="quiz"/>
    <div>
      <button class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#scoreboardModal">Wyświetl ranking</button>
      <div class="modal fade" id="scoreboardModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="scoreboardModalLabel">Ranking</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">Gracz</th>
                  <th scope="col">Wynik</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="score in gameScores" :key="score.playerID">
                  <td>{{ score.playerID }}</td>
                  <td>{{ score.score }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import {Modal} from "bootstrap";
import { HighscoreDAO } from '@/firebase/highscoreDAO';

export default {
  name: 'GameTile',
  props: ['gameName', 'gameIcon', 'isButtonEnabled'],
  data() {
    return {
      // gameScores: [],
      // userName: 'mockUserName',
      // displayScoreboard: false
      highScoreDAO: new HighscoreDAO(),
    }
  },

  // Wywołuje funkcję po załadowaniu komponentu
  created() {
    // this.updateScoreboard();
  },

  // Aktualizuje wyniki po zmianie danych
  // (obecnie taka nie istnieje)
  watch: {
    gameScores: {
      handler() {
        // this.updateScoreboard();
      },
      deep: true
    },
  },

  mounted() {
    let modalElement = document.getElementById('scoreboardModal');
    this.modalInstance = new Modal(modalElement);
  },

  methods: {
    startGame() {
      // Powinno utylizować metodę getQuizStatus(), np.:
      // const isQuizFinished = this.getQuizStatus(this.userName);
      if (this.$refs.quiz.isFinished && this.isButtonEnabled) {
        this.$refs.minigame.start(this.userName);
      } else {
        this.displayMessage('Najpierw ukończ quiz');
      }
    },

    async getScores() {
      const minigameID = 'id';
      const scores = await this.highScoreDAO.getByMinigame(minigameID);
      return scores.map(score => {
        return {
          playerID: score.characterID,
          score: score.points
        }
      })
    },

    // Aktualizuje wyniki i sortuje je
    // updateScoreboard() {
    //   this.gameScores = this.getScores();
    //   this.gameScores.sort((a, b) => b.score - a.score);
    // },

    displayMessage(message) {
      this.$toast(message);
    },

    getQuizStatus() {
      return this.$refs.quiz.isFinished[this.userName];
    },

    showModal() {
      this.modalInstance.show();
    },

  }
}
</script>

<style scoped>
.game-tile {
  padding: 20px;
  box-sizing: border-box;
}

.game-icon, .game-title {
  border-radius: 10px;
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: 0px 0px 13px 0px rgba(80, 78, 82, 0.8);
}

.game-title {
  padding: 45px 20px;
  width: 60%;
  margin: 0 auto;
}

.game-icon:hover, .game-title:hover {
  cursor: pointer;
  background: rgb(71, 190, 245);
  box-shadow: 0px 0px 13px 0px rgba(80, 78, 82, 0.8);
}

.modal-body .table {
  font-size: 40px;
}
</style>
