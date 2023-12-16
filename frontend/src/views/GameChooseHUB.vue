<template>
  <h1 class="text-center">Minigry</h1>
  <div class="game-hub container">
    <div class="row">
      <div class="col-6" v-for="(game, index) in availableGames" :key="index">
        <GameTile :gameName="game.name" :gameIcon="game.icon"/>
      </div>
    </div>
  </div>
</template>

<script>
import GameTile from '../../components/choosegame/GameTile.vue'
import GarbageTerrorIcon from '../../assets/choosegame/garbage-terror-icon.png'

export default {
  name: 'GameChooseHUB',
  components: {
    GameTile
  },
  data() {
    return {
      // Na ten moment tak to wygląda
      availableGames: [
        {name: 'Gra1', icon: GarbageTerrorIcon},
        {name: 'Gra2'},
        {name: 'Gra3'},
        {name: 'Gra4'}
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
</style>