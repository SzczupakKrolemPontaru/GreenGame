<template>
    <div>
      <div class="background2"></div>
      <button @click="handleButtonClick">Click me!</button>
    <button @click="handleButton2Click">Click me too!</button>
    </div>
  </template>
  
  <script>
export default {
  methods: {
    handleButtonClick() {
      this.$router.push('/minigame');
    },
    handleButton2Click() {
      this.$router.push('/minigame');
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
  button {
  margin-top: 140px;
  margin-right: 95px;
  padding:40px 50px;
  font-size: 16px;
  cursor: pointer;
}
  </style>