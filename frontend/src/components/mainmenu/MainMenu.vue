<template>
  <div class="row border flex-grow-1">
    <div class="col-3 border">
      <div class="row border h-80">
        <div class="col">
          <div class="h3">TOP 10 Scoreboard</div>
          <ol class="list-group list-group-numbered">
            <li v-for="player in displayScoreBoard" :key="player" class="list-group-item list-group-item-dark">{{ player.name }} {{ player.score }}</li>
          </ol>
        </div>
      </div>

      <div class="row border h-20">
        <div class="col"></div>
      </div>
    </div>

    <div class="col-7 border">
      <div class="row border h-90 my-3">
        <div class="col">
          <div class="row border h-15">
            <div class="col">
              <div class="row h-100 d-flex flex-row justify-content-center">
                <div class="me-3 col-5 h-100 border">
                  <img class="z-2 position-relative" alt="hat" :src="require(`@/assets/MainMenu/hats/${displayHat}`)"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row border h-70">
            <div class="col">
              <div class="row h-100 d-flex flex-row justify-content-between align-items-center">
                <div class="col-2 border h-20">
                  <img src="@/assets/MainMenu/buttons/left_arrow.svg" alt="Arrow Right" id="arrowButton" style="width: 100%; height: 100%;" @click="changeHat(-1)" />
                </div>
                <div class="col-6 h-100 border">
                  <img alt="player" class="h-80" :src="require(`@/assets/MainMenu/character/${displayPlayer}`)" />
                  <div class="row h-10 d-flex flex-row justify-content-center align-items-end">
                    <div class="col-4 h-20">
                      <button @click="saveChanges" class="btn btn-primary">Zapisz czapkę</button>
                    </div>
                  </div>
                </div>
                <div class="col-2 border h-20">
                  <img src="@/assets/MainMenu/buttons/right_arrow.svg" alt="Arrow Right" id="arrowButton" style="width: 100%; height: 100%;" @click="changeHat(1)" />
                </div>
              </div>
            </div>
          </div>

          <div class="row border h-15">
            <div class="col">
              player info
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-2 border">
      <div class="row border h-10 d-flex row-flex justify-content-end">
        <div class="col-8 border h-70">
          player name
        </div>
      </div>

      <div class="row border h-40">
        <div class="col">
          blank
        </div>
      </div>

      <div class="row border align-items-center h-50 d-flex row-flex justify-content-end">
        <div class="col border h-40">
          play button
<!--          <button @click=" " class="btn btn-primary">zagraj</button>-->
          <div class="row h-80 align-items-end d-flex row-flex justify-content-start">
            <div class="col-4 border h-40">
              booster
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userManager: 'userManager',
      userProfile: 'userProfile',
      scoreBoard: [
        { name: 'marekkox', score: 15 },
        { name: 'ania18', score: 12 },
        { name: 'xXx_KiNg-xXx', score: 8 },
        { name: '------------', score: 0 },
        { name: '-----------', score: 0 },
        { name: '-----------', score: 0 },
        { name: '-----------', score: 0 },
        { name: '-----------', score: 0 },
        { name: '-----------', score: 0 },
        { name: '-----------', score: 0 },
      ],
      availableHats: [null],
      currentHat: 1
    };
  },
  computed: {
    displayPlayer() {
      return 'character.svg';
    },
    displayHat() {
      return `hat_${this.currentHat}.svg`;
    },
    displayScoreBoard() {
      return this.scoreBoard;
    },
    displayMainMenu() {
      return true
    },
    displayLevel() {
      return true
    },
    displayBooster() {
      return true
    }
  },
  methods: {
    logout() {
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
      let new_hat = this.currentHat + inStep;
      console.log(new_hat);

      if (new_hat === (this.availableHats.length - 1)) {
        this.currentHat = 0;
      } else if (new_hat === -1) {
        this.currentHat = this.availableHats.length-2;
      } else {
        this.currentHat = new_hat;
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

</style>
