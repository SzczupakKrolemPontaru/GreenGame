<template>
    <div id="app">
      <div class="background"></div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
     
    },
    methods: {
    }
    
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
  </style>