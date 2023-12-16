<template>
  <h1>Minigry</h1>
  <div class="game-hub">
    <GameTile v-for="(game, index) in availableGames" :key="index" :gameName="game.name" />
  </div>
</template>

<script>
import GameTile from './GameTile.vue'
export default {
  name: 'GameChooseHUB',
  components: {
    GameTile
  },
  data() {
    return {
      availableGames: [
        {name: 'Gra1'},
        {name: 'Gra2'},
        {name: 'Gra3'},
        {name: 'Gra4'}
        // na razie tak pozniej sie wstawi dane
      ],
    }
  },
}
</script>

<style scoped>
.game-hub {
  display: grid;
  font-size: 40px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-top: 10px;
  width: 50%;
  height: 50%;
  margin-left: auto;
  margin-right: auto;

}

h1 {
  text-align: center;
  font-size: 50px;
} 
</style>