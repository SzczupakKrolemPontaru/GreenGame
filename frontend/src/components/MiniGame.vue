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
  <p>Difficulty Level: {{ difficultyLevel }}</p>
  <p>Points Multiplier: {{ pointsMultiplier }}</p>
  <p>Value from Router: {{ value }}</p>
</div>
    <div v-for="trashItem in trashItems" :key="trashItem.id" class="trash" :style="{ left: trashItem.position.x + 'px', top: trashItem.position.y + 'px' }">
      <svg class="svg-object" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <circle cx="15" cy="15" r="15" fill="#FF0000"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      difficultyLevel: 0,
      playerScore: 100,
      pointsMultiplier: 2,
      multiplayer: false,
      gameID: 0,
      gameNumber: 0,
      containerPosition: { x: 25, y: 470 },
      trashItems: [],
    };
  },
  methods: {
    setDifficulty() {
      console.log(this.value);
      if (this.value === 1) {
        this.difficultyLevel = 1;
        this.pointsMultiplier = 1;
      } else if (this.value === 2) {
        this.difficultyLevel = 2;
        this.pointsMultiplier = 2;
      }
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
    generateTrash() {
      setInterval(() => {
        const trashItem = {
          id: this.trashItems.length + 1,
          position: { x: Math.random() * (1000 - 30), y: 0 },
        };
        this.trashItems.push(trashItem);
      }, 2000);
    },
    checkCollisions() {
  const containerBounds = {
    left: this.containerPosition.x,
    right: this.containerPosition.x + 80,
    top: this.containerPosition.y,
    bottom: this.containerPosition.y + 50,
  };

  this.trashItems.forEach((trashItem, index) => {
    const trashBounds = {
      left: trashItem.position.x,
      right: trashItem.position.x + 30,
      top: trashItem.position.y,
      bottom: trashItem.position.y + 30,
    };

    if (
      trashBounds.right > containerBounds.left &&
      trashBounds.left < containerBounds.right &&
      trashBounds.bottom > containerBounds.top &&
      trashBounds.top < containerBounds.bottom
    ) {
      // Śmieć trafił do kontenera
      this.updateScore(1 * this.pointsMultiplier); // Dodaj punkty z uwzględnieniem mnożnika
      this.trashItems.splice(index, 1);
    } else if (trashBounds.bottom > window.innerHeight) {
      // Śmieć spadł na ziemię
      this.updateScore(-1 * this.pointsMultiplier); // Odejmij punkty z uwzględnieniem mnożnika
      this.trashItems.splice(index, 1);
    }
  });
},
    updateTrashPositions() {
      this.trashItems.forEach((trashItem) => {
        trashItem.position.y += 10; // Zwiększono wartość z 2 na 5, dostosuj według potrzeb
      });

      this.checkCollisions();
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
    setInterval(this.updateTrashPositions, 16);
    this.generateTrash();
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
  left: 50px;
  color: white;
  font-size: 28px;
}

.trash {
  position: fixed;
  width: 30px; 
  height: 30px;
  pointer-events: none;
}
</style>
