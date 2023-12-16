<template>
    <div>
      <div class="background4"></div>
      <button @click="handleButtonClick">Click me!</button>
      <button @click="handleButton2Click">Click me too!</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleButtonClick() {
        this.$router.push({ name: 'minigame', params: { value: 1 } });
      },
      handleButton2Click() {
        this.$router.push({ name: 'minigame', params: { value: 2 } });
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
    background: url('../assets/background4.gif') center center no-repeat;
    background-size: cover;
    pointer-events: none;
  }
  
  button {
    margin-top: 140px;
    margin-right: 95px;
    padding: 40px 50px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  