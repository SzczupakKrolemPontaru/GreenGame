<template>
    <div>
      <div class="background2"></div>
    </div>
  </template>
  
  <script>
  export default {
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
  </style>