<template>
  <div>
    <div class="background3"></div>
    <div class="overlay" :style="{ left: containerPosition.x + 'vw', top: containerPosition.y + 'vh' }">
      <svg class="svg-object" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <rect x="10" y="30" width="80" height="50" fill="#4CAF50" stroke="#333" stroke-width="2" />
        <rect x="10" y="30" width="80" height="5" fill="#4CAF50" stroke="#333" stroke-width="2" />
        <circle cx="15" cy="55" r="2" fill="#333" />
        <circle cx="85" cy="55" r="2" fill="#333" />
      </svg>
    </div>
    <div class="score-display">
      <p>Gracz: {{ playerName }}</p>
      <p v-if="difficultyLevel === 1">Poziom: Łatwy</p>
      <p v-else-if="difficultyLevel === 2">Poziom: Trudny</p>
      <p>Wynik: {{ playerScore }}</p>
      <p>Czas: {{ timer }}s</p>
    </div>
    <div v-for="trashItem in trashItems" :key="trashItem.id" class="trash" :style="{ left: trashItem.position.x + 'vw', top: trashItem.position.y + 'vh' }">
      <img v-if="trashItem.type === 1" :src="require('@/assets/MiniGame/paper_waste.svg')" alt="Paper Trash">
      <img v-else-if="trashItem.type === 2" :src="require('@/assets/MiniGame/plastic.svg')" alt="Plastic Trash">
      <img v-else-if="trashItem.type === 3" :src="require('@/assets/MiniGame/apple.svg')" alt="Organic Trash">
      <img v-else :src="require('@/assets/MiniGame/trash.svg')" alt="Generic Trash">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MinigameDAO } from '@/firebase/minigameDAO.js';

import {store} from "@/store";
export default {
props: ['value'],
 
  data() {
    return {
      gameEnded: false,
      difficultyLevel: 2,
      playerScore: 0,
      playerName: store.user?.name || "gość",
      custom: 100,
      pointsMultiplier: 1,
      multiplayer: false,
      gameID: 0,
      gameNumber: 0,
      containerPosition: { x: 10, y: 65 }, 
      trashItems: [],
      timer: 30, 
      isMovingRight: false,
      isMovingLeft: false,
      step: 1.0,
      trashInterval: null,
      minigameDAO: null,
    };
  },
  methods: {
  setDifficulty() {
    this.gameEnded = false;
    if (this.$route.params.value === '1') {
      this.difficultyLevel = 1;
      this.pointsMultiplier = 1;
    } else if (this.$route.params.value === '2') {
      this.difficultyLevel = 2;
      this.pointsMultiplier = 2;
    }
  },
    
  handleKeyDown(event) {
      if (event.key === 'd' && !this.isMovingRight) {
        this.isMovingRight = true;
        this.moveContainerRight();
      } else if (event.key === 'a' && !this.isMovingLeft) {
        this.isMovingLeft = true;
        this.moveContainerLeft();
      }
    },
    handleKeyUp(event) {
      if (event.key === 'd') {
        this.isMovingRight = false;
      } else if (event.key === 'a') {
        this.isMovingLeft = false;
      }
    },
    moveContainerRight() {
      if (this.isMovingRight) {
        this.containerPosition.x += this.step;
        requestAnimationFrame(this.moveContainerRight);
      }
    },
    moveContainerLeft() {
      if (this.isMovingLeft) {
        this.containerPosition.x -= this.step;
        requestAnimationFrame(this.moveContainerLeft);
      }
    },
    updateTimer() {
      if (this.timer > 0) {
        this.timer -= 1;
      } else {
        this.endGame();
      }
    },
    updateScore(actions) {
      this.playerScore += actions;
      this.$emit('updateScore', this.playerScore);
    },
    generateTrash() {
      this.trashInterval = setInterval(() => {
        const trashType = Math.floor(Math.random() * 4) + 1; 
        const trashItem = {
          id: this.trashItems.length + 1,
          type: trashType,
          position: { x: Math.random() * (100 - 3), y: 0 },
        };
        this.trashItems.push(trashItem);
      }, 2000);
    },
    checkCollisions() {
      const containerBounds = {
        left: this.containerPosition.x + 10,
        right: this.containerPosition.x + 20,
        top: this.containerPosition.y,
        bottom: this.containerPosition.y + 5,
      };

      this.trashItems.forEach((trashItem, index) => {
        if (this.difficultyLevel ===1) {
          trashItem.position.y += 1;
        }
        else {
          trashItem.position.y += 1.3;
        }
        

        const trashBounds = {
          left: trashItem.position.x,
          right: trashItem.position.x + 3,
          top: trashItem.position.y,
          bottom: trashItem.position.y + 1,
        };
    
        const trashInContainer =
        trashBounds.right >= containerBounds.left &&
        trashBounds.left <= containerBounds.right &&
        trashBounds.bottom >= containerBounds.top &&
        trashBounds.top <= containerBounds.bottom;

        const trashFell = trashBounds.bottom > this.custom;

        if (trashInContainer) {
          this.updateScore(1 * this.pointsMultiplier);
          this.trashItems.splice(index, 1);
        } else if (trashFell) {
          this.updateScore(-1 * this.pointsMultiplier);
          this.trashItems.splice(index, 1);
        }
      });
    },
    updateTrashPositions() {
      this.checkCollisions();
    },
async endGame() {
  if (!this.gameEnded) {
    this.gameEnded = true;
    clearInterval(this.trashInterval);
    
    const finalScore = this.playerScore;
    const playerName = store.user?.name || "gość"; 

    await this.minigameDAO.pushScore(this.gameID, playerName, finalScore);
    alert(`Koniec gry, twój wynik to: ${finalScore}`);

    this.timer = 1;
    this.$router.push({ name: 'gamechoose' });
  }
},

  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    console.log(this.value);
    this.setDifficulty();
    setInterval(this.updateTrashPositions, 16);
    setInterval(this.updateTimer, 1000);
    this.generateTrash();

    this.minigameDAO = new MinigameDAO();
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  },
};
</script>

<style scoped>
#app {
  position: relative;
  text-align: center;
  overflow: hidden;
}

.background3 {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('../assets/MiniGame/background4.svg') center center no-repeat;
  background-size: cover;
  pointer-events: none;
}

.overlay {
  position: fixed;
  width: 30vw;
  height: 30vh;
  pointer-events: none;
}

.svg-object {
  width: 100%;
  height: 100%;
}

.score-display {
  position: fixed;
  top: 2vh;
  left: 5vw;
  color: rgb(5, 30, 93);
  font-size: 1.5vw;
}

.trash {
  position: fixed;
  width: 3vw;
  height: 3vw;
  pointer-events: none;
}
</style>
