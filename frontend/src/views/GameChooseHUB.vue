<template>
  <h1>Minigry</h1>
  <div class="game-hub">
    <GameTile v-for="(game, index) in availableGames" :key="index" :gameName="game.name" :launchGame="game.launchFunction" :isQuizFinished="game.isQuizFinished" />
  </div>
</template>

<script>
import GameTile from './GameTile.vue'
import router from "@/router";
export default {
  name: 'GameChooseHUB',
  components: {
    GameTile
  },
  data() {
    return {
      availableGames: [
        {name: 'Game1', launchFunction: 'selectGame1', isQuizFinished: false},
        {name: 'Game2', launchFunction: 'selectGame2'},
        {name: 'Game3', launchFunction: 'selectGame3'},
        {name: 'Game4', launchFunction: 'selectGame4'}
        // na razie tak pozniej sie wstawi dane
      ],
    }
  },
  methods: {
    selectGame1() {
      // if (Quiz1.isFinished)
      // jakoś się to połączy mam nadzieje
      router.push('/game1');
    }
  }
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