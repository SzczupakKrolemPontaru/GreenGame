<template>
  <div id="app" class="centeredContainer">
    <div class="background"></div>
    <button @click="handleButtonClick"></button>
  </div>
</template>

<script>
export default {
  props: ['gameNumber'],
  methods: {
    handleButtonClick() {
      this.$router.push({ name: 'chooselevel' });
      
    },
  },
};
</script>

<style>
#app {
  position: relative;
  overflow: hidden;
}
.background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('../assets/MiniGame/background.gif') center center no-repeat;
  background-size: cover;
  pointer-events: none;
}
.centeredContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  margin-top: 0px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
