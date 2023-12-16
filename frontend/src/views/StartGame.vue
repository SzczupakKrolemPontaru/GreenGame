<template>
  <div id="app">
    <div class="background"></div>
    <button @click="handleButtonClick">Click me!</button>
  </div>
</template>

<script>
export default {
  props:['gameNumber'], //gameNumber mamy od GameChooseHUB
  mounted() {
  },
  methods: {
    handleButtonClick() {
      this.$router.push({
        name: 'choosemode',
      });
    },
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

.background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('../assets/background.gif') center center no-repeat; 
  background-size: cover;
  pointer-events: none;
}

button {
  margin-top: 250px; 
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

}
</style>
