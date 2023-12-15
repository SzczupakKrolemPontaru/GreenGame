<template>
    <div>
      <div class="background3"></div>
      <div id="app">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        difficultyLevel: 0,
        playerScore: 0,
        pointsMultiplier: 0,
        multiplayer: false,
        gameID: 0,
       // gameNumber: 0,
      };
    },
    methods: {
      setDifficulty(difficulty) {
        this.difficultyLevel = difficulty;
      },
      updateScore(actions) {
        this.playerScore += actions;
      },
      loadMultiplayerModule() {
        
      },
     /* sendToDatabase(playerScore) {
        
      },
      loadGameFromHub(gameNumber) {
        
      },
      sendToMultiplayer(playerScore) {
        
      },*/
    },
    mounted() {
      
    },
    beforeUnmount() {
      
    },
  };
  </script>
  
  <style>
  #app {
    position: relative;
    text-align: center;
    margin-top: 50px;
    overflow: hidden;
  }
  
  .background3 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url('../assets/background3.gif') center center no-repeat;
    background-size: cover;
    pointer-events: none;
  }
  </style>
  