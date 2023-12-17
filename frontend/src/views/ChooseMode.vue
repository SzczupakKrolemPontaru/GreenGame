<template>
  <div>
    <div class="background4"></div>
    <div class="button-container">
      <button @click="handleButtonClick"></button>
      <button @click="handleButton2Click"></button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleButtonClick() {
      this.$router.push({ name: 'minigame', params: { value: 1 } });
    },
    handleButton2Click() {
      this.$router.push({ name: 'session', params: { value: 2 } });
    },
  },
};
</script>

<style>
#app {
  position: relative;
  text-align: center;
  overflow: hidden;
}

.background4 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url('../assets/background3.gif') center center no-repeat;
    background-size: cover;
    pointer-events: none;
  }
.button-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  margin-top: 300px; 
}

button {
  margin: 0 10px; 
  padding: 60px 200px; 
  font-size: 16px;
  cursor: pointer;
}
</style>
