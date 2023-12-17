<template>
  <h1 class="text-center">Minigry</h1>
  <div class="game-hub container">
    <div class="row">
      <div class="col-6" v-for="(game, index) in availableGames" :key="index">
        <GameTile :gameName="game.name" :gameIcon="game.icon" :isButtonEnabled= "game.isButtonEnabled"/>
      </div>
      <router-link to="/mainmenu" class="btn btn-secondary btn-back">Powrót do menu</router-link>
    </div>
  </div>
</template>

<script>
import GameTile from '../components/GameTile.vue'
import GarbageTerrorIcon from '../assets/garbage-terror-icon.png'

export default {
  name: 'GameChooseHUB',
  components: {
    GameTile
  },
  data() {
    return {
      // Na ten moment tak to wygląda
      availableGames: [
        {name: 'Gra1', icon: GarbageTerrorIcon, isButtonEnabled: true},
        {name: 'Gra2', isButtonEnabled: false},
        {name: 'Gra3', isButtonEnabled: false},
        {name: 'Gra4', isButtonEnabled: false}
      ],
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 50px;
  margin-top: 200px;
  margin-bottom: 50px;
}

.btn-back {
  width: 200px; /* Adjust this value as needed */
  margin: 0 auto;
  display: block;
}
</style>