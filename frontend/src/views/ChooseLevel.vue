<template>
  <div class="background2"></div>
  <div class="button-container">
    <button @click="handleButtonClick(1)"></button>
    <button @click="handleButton2Click(2)"></button>
  </div>
</template>

<script>
export default {
  methods: {
    handleButtonClick(value) {
      this.$router.push({ name: 'choosemode', params: { value } });
    },
    handleButton2Click(value) {
      this.$router.push({ name: 'choosemode', params: { value } });
    },
  },
};
</script>

<style>
.background2 {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url('../assets/background2.gif') center center no-repeat;
  background-size: cover;
  pointer-events: none;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 210px;
}

button {
  margin: 0 20px; 
  padding: 60px 170px;
  font-size: 16px;
  cursor: pointer;
}
</style>
