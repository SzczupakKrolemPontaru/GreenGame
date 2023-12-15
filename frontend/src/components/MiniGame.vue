<template>
    <div>
      <div class="background3"></div>
      <div class="overlay" :style="{ left: containerPosition.x + 'px', top: containerPosition.y + 'px' }">
        <svg class="svg-object" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <!-- Kontener do śmieci -->
          <rect x="10" y="30" width="80" height="50" fill="#4CAF50" stroke="#333" stroke-width="2" />
          <!-- Pokrywa kontenera -->
          <rect x="10" y="25" width="80" height="5" fill="#4CAF50" stroke="#333" stroke-width="2" />
          <!-- Uchwyt pokrywy kontenera -->
          <rect x="45" y="25" width="10" height="5" fill="#4CAF50" stroke="#333" stroke-width="2" />
          <!-- Rączka kontenera -->
          <rect x="35" y="15" width="30" height="10" fill="#4CAF50" stroke="#333" stroke-width="2" />
        </svg>
      </div>
      <div class="score-display">
        <p>Score: {{ playerScore }}</p>
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
        gameNumber: 0,
        containerPosition: { x: 25, y: 470 }
      };
    },
    methods: {
      setDifficulty(difficulty) {
        this.difficultyLevel = difficulty;
      },
      handleKeyPress(event) {
        const step = 30;
        if (event.key === 'd') {
          this.containerPosition.x += step;
        } else if (event.key === 'a') {
          this.containerPosition.x -= step;
        }
      },
      updateScore(actions) {
        this.playerScore += actions;
      },
      loadMultiplayerModule() {},
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.handleKeyPress);
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
  
  .overlay {
    position: fixed;
    width: 30%;
    height: 30%;
    pointer-events: none;
  }
  
  .svg-object {
    width: 100%;
    height: 100%;
  }
  
  .score-display {
    position: fixed;
    top: 10px;
    left: 70px;
    color: white;
    font-size: 28px;
  }
  </style>
  