<template>
  <div>
    <GameTile v-for="(game, index) in availableGames" :key="index" ref="gameTiles"/>
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
      availableGames: [],
    }
  },
  methods: {
    displayGames() {
      // ta metoda jest niepotrzebna w ogóle XD
    },
    selectGame() {
    }
  }
}
</script>

<style scoped>
</style>