<template>
  <div class="game-tile">
    <h2 class="game-icon" @click="startGame">{{ gameName }}</h2>
    <Minigame ref="minigame"/>
    <Quiz ref="quiz"/>
    <div>
      <button class="btn" @click="displayScoreboard = true">Wyświetl ranking</button>
      <div v-if="displayScoreboard" class="modal">
        <div class="modal-content">
          <h2>Ranking</h2>
          <table>
            <thead>
            <tr>
              <th>Gracz</th>
              <th>Wynik</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="score in gameScores" :key="score.playerID">
              <td>{{ score.playerID }}</td>
              <td>{{ score.score }}</td>
            </tr>
            </tbody>
          </table>
          <button @click="displayScoreboard = false">Zamknij</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

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
    }

  }
}
</script>

<style scoped>
.game-icon {
  border: 1px solid black;
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
