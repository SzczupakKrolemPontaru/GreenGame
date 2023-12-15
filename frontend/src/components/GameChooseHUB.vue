<template>
  <div>
    <GameTile v-for="game in availableGames" :key="game.id" :game="game" />
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

    },
    selectGame() {

    }
  }
}
</script>

<style scoped>
</style>