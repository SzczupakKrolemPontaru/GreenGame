<template>
  <div class="row flex-grow-1">

    <div class="col-3">
      <div class="h1 score-board-title">TOP 10 Scoreboard</div>
      <table class="table-view h3" style="background-color:rgba(0, 0, 0, 0);">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nick</th>
            <th scope="col">score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in displayScoreBoard" :key="player">
            <th scope="row">{{ player.id }}</th>
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-6">
      <div class="row h-100">
        <div class="col-4">
          <img class="arrow" src="@/assets/MainMenu/buttons/left_arrow.svg" alt="Arrow Left" id="arrowButton" style="height: 100%;" @click="changeHat(-1)" />
                </div>
        <div class="col-4 d-flex justify-content-center">
          <img class="hat d-flex d-inline-block order-first img-fluid" alt="hat" :src="require(`@/assets/MainMenu/hats/${displayHat}`)"/>
          <img alt="player" class="d-flex d-inline-block order-last player" :src="require(`@/assets/MainMenu/character/${displayPlayer}`)" />
          <button v-if="hatToDisplay !== currentHat" @click="saveChanges" class="btn btn-success d-flex d-inline-block save-hat">Zapisz czapkę</button>
          <p class="h1 d-flex d-inline-block player-nick">{{ displayPlayerNick }}</p>
          <p class="h2 d-flex d-inline-block level">level: {{ displayLevel }}</p>
              </div>
        <div class="col-4">
          <img class="arrow" src="@/assets/MainMenu/buttons/right_arrow.svg" alt="Arrow Right" id="arrowButton" style="height: 100%;" @click="changeHat(1)" />
        </div>
      </div>
    </div>

    <div class="col-3">

      <button type="button" class="btn btn-primary button-logout">
              <v-btn @click="logout">Log Out</v-btn>
          </button>

      <div class="row h-40">
        <div class="col">
        </div>
      </div>

      <div class="row align-items-center h-100">
        <div class="col-4 h-60">
          <v-btn class="start-btn" @click="playGame"><img src="@/assets/MainMenu/buttons/button_start.png" alt="start button"/></v-btn>
        </div>
        <div class="col-8"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
      userManager: Object,
      userProfile: Object,
  },
  data() {
    return {
      scoreBoard: [
        {id: 1, name: 'marekkox', score: 15 },
        {id: 2, name: 'ania18', score: 12 },
        {id: 3, name: 'xXx_KiNg-xXx', score: 8 },
        {id: 4, name: '------------', score: 0 },
        {id: 5, name: '-----------', score: 0 },
        {id: 6, name: '-----------', score: 0 },
        {id: 7, name: '-----------', score: 0 },
        {id: 8, name: '-----------', score: 0 },
        {id: 9, name: '-----------', score: 0 },
        {id: 10, name: '-----------', score: 0 },
      ],
      availableHats: [null],
      currentHat: 1,
      hatToDisplay: 1
    };
  },
  computed: {
    displayPlayer() {
      return 'character.png';
    },
    displayHat() {
      return `hat_${this.hatToDisplay}.svg`;
    },
    displayScoreBoard() {
      return this.scoreBoard;
    },
    displayMainMenu() {
      return true
    },
    displayPlayerNick() {
      return this.userProfile.userName;
    },
    displayLevel() {
      return this.userProfile.level;
    },
    displayBooster() {
      return true
    }
  },
  methods: {
    logout() {
      this.$router.push({
        name: 'login'
      })
    },
    playGame() {
      this.$router.push({
        name: 'quiz'
      })
    },
    getLoggerUser() {
    },
    editAccount() {
    },
    saveChanges() {
      console.log('save changes');
      alert('czapka została zapisana!');
    },
    changeHat(inStep) {
      let new_hat = this.hatToDisplay + inStep;

      if (new_hat === (this.availableHats.length - 1)) {
        this.hatToDisplay = 0;
      } else if (new_hat === -1) {
        this.hatToDisplay = this.availableHats.length-2;
      } else {
        this.hatToDisplay = new_hat;
      }
    },
    setAvailableHats() {
      // level is set to 3, it's temporary because we have no idea what we get from DB
      let level = 3;

      for (let i = 0; i <= level; i++) {
        this.availableHats.push(i);
      }
    },
  },
  created() {
    this.setAvailableHats();
  },
};
</script>

<style scoped>

    .h-10 {
        height: 10%;
    }
    .h-15 {
        height: 15%;
    }
    .h-20 {
        height: 20%;
    }
    .h-40 {
        height: 40%;
    }

    .h-60 {
        height: 70%;
    }
    .h-70 {
        height: 70%;
    }
    .h-80 {
        height: 80%;
    }

    .h-90 {
        height: 90%;
    }

    .hat {
      position: absolute;
      z-index: 2;
      width: 212px;
      height: 25%;
    }
    .player {
      position: absolute;
      z-index: 1;
      width: 212px;
      top: 20%;
    }
    .level {
      position: absolute;
      z-index: 1;
      top: 90%;
    }
    .player-nick {
      position: absolute;
      z-index: 1;
      top: 82%;
    }
    .arrow {
      position: relative;
      width: 10vw;
      z-index: 2;
      cursor: pointer;
    }

    .save-hat {
      position: absolute;
      z-index: 2;
      top: 65%;
    }

    .responsive-img {
      width: 15vw;
      height: auto;
    }

    .button-logout {
      width: 18vw;
      font-weight: bold;
      cursor: pointer;
    }
    .start-btn {
      cursor: pointer;
    }

    .score-board-title {
      font-size: 3vw;
      text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.5), 1px -1px 0 rgba(255, 255, 255, 0.5), -1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 0.5);
    }

    .table-view {
      font-size: 2vw;
      text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.5), 1px -1px 0 rgba(255, 255, 255, 0.5), -1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 0.5);
    }

    @media screen and (max-width: 900px) {
      .score-board-title {
        font-size: 5vw;
      }
      .table-view {
        font-size: 3vw;
      }

      .arrow {
        width: 15vw;
      }

      .button-logout {
        width: 20vw;
      }

      .start-btn {
        position: absolute;
        right: 20%;
        z-index: 4;
      }

      .save-hat {
        top: 75%;
      }

    }

</style>
