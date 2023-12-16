<!-- src/App.vue -->
<template>
  <nav>
    <router-link to="/">TUTAJ przejscie z GAMEchooseHUB</router-link> |
    <router-link to="/start">START GAME</router-link>
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
