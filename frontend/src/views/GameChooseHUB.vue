<template>
  <h1 class="text-center mt-3">Minigry</h1>
  <div class="game-hub container">
    <div class="row">
      <div class="col-6" v-for="(game, index) in availableGames" :key="index">
        <GameTile :gameName="game.name" :gameIcon="game.icon" :isButtonEnabled="game.isButtonEnabled"/>
      </div>
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
      availableGames: [
        {name: 'MiniGame1', icon: GarbageTerrorIcon, isButtonEnabled: true},
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
  margin-bottom: 50px;
}

.btn-back {
  width: 200px;
  margin: 0 auto;
  display: block;
}

</style>