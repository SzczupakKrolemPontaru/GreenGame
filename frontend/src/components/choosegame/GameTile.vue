<template>
  <div class="game-tile">
    <h2 class="game-icon" @click="startGame">{{ gameName }}</h2>
    <Minigame ref="minigame"/>
    <Quiz ref="quiz"/>
    <div>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scoreboardModal">Wyświetl ranking</button>
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

export default {
  name: 'GameTile',
  props: ['gameName'],
  data() {
    return {
      gameScores: [],
      userName: 'mockUserName',
      displayScoreboard: false
    }
  },
  components: {
    // domyślnie tu ma być rzeczywisty komponent Minigame
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
          console.log('Minigra rozpoczęta');
        },
      }
    },
    // domyślnie tu ma być rzeczywisty komponent Quiz
    Quiz: {
      template: '<div>Mock Quiz</div>',
      data() {
        return {
          isFinished: true,
        };
      },
    },
  },

  // Wywołuje funkcję po załadowaniu komponentu
  created() {
    this.updateScoreboard();
  },

  // Aktualizuje wyniki po zmianie danych
  // (obecnie taka nie istnieje)
  watch: {
    gameScores: {
      handler() {
        this.updateScoreboard();
      },
      deep: true
    },
  },

  mounted() {
    let modalElement = document.getElementById('scoreboardModal');
    this.modalInstance = new Modal(modalElement);
  },

  methods: {
    // Rozpoczyna minigrę, jeśli quiz został ukończony
    startGame() {
      // powinno być tak:
      // const isQuizFinished = this.getQuizStatus(this.userName);
      if (this.$refs.quiz.isFinished) {
        this.$refs.minigame.start(this.userName);
      } else {
        this.displayMessage('Najpierw ukończ quiz');
      }
    },

    // Pobiera wyniki z bazy danych
    // (na razie tak, w przyszłości z bazy pobierany plik json)
    getScores() {
      return [
        {playerID: 'gracz1', score: 58},
        {playerID: 'gracz2', score: 21},
        {playerID: 'gracz3', score: 96},
        {playerID: 'gracz4', score: 73},
      ];
    },

    // Aktualizuje wyniki i sortuje je
    updateScoreboard() {
      this.gameScores = this.getScores();
      this.gameScores.sort((a, b) => b.score - a.score);
    },

    // Wyświetla wiadomość (na razie w konsoli)
    displayMessage(message) {
      console.log(message);
    },

    // Pobiera status quizu
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

.game-icon {
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  text-align: center;
}

.btn-primary {
  margin-top: 20px;
}
</style>
