<template>
  <div class="game-tile">
    <div class="game-container" @click="startGame" >
      <img class="game-icon" v-if="gameIcon" :src="gameIcon" alt="Game Icon" />
      <h2 class="game-title" v-else>{{ gameName }}</h2>
    </div>
    <div>
      <button class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#scoreboardModal" :disabled="!isButtonEnabled">Wyświetl ranking</button>
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
import { Modal } from "bootstrap";
import { HighscoreDAO } from '@/firebase/highscoreDAO';
import { QuizDAO } from "@/firebase/quizDAO";
import { getLoggedUser } from '@/firebase/auth';
import Notiflix from "notiflix";

export default {
  name: 'GameTile',
  props: ['gameName', 'gameIcon', 'isButtonEnabled'],
  data() {
    return {
      highScoreDAO: new HighscoreDAO(),
      quizDAO : new QuizDAO(),
      gameScores: [],
    }
  },

  mounted() {
    let modalElement = document.getElementById('scoreboardModal');
    this.modalInstance = new Modal(modalElement);
    modalElement.addEventListener('show.bs.modal', async () => {
    this.gameScores = await this.getScores();
  });
  },


  methods: {
    async startGame() {
      const user = getLoggedUser();
      if (user) {
        if (await this.getQuizStatus(user.uid) && this.isButtonEnabled) {
        this.$router.push('/startgame');
      } else {
        this.displayMessage('Najpierw ukończ quiz');
      }} else {
        this.$router.push('/startgame');
      }
    },

    async getScores() {
      const scores = await this.highScoreDAO.getByMinigame(0);
      console.log(scores);
      if (scores) {
        return scores.map(score => {
          return {
            playerID: score.characterID,
            score: score.points
          }
      })
      } else {
        this.displayMessage('Brak wyników');
        return [];
      }
    },

    displayMessage(message) {
      Notiflix.Notify.warning(message);
    },

    async getQuizStatus(uid) {
      const completedQuizzesIDs = await this.quizDAO.getCompletedQuizzesIDs(uid);
      if (completedQuizzesIDs) {
        return true;
      } else {
        return false;
      }
    },

    async displayScoreboard() {
      this.gameScores = await this.getScores();
      this.showModal();
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
