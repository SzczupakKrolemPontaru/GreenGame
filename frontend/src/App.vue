<template>
  <MainNav/>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
</style>
<script>
import MainNav from "@/components/MainNav";
import {onMounted} from "vue";
import {auth} from './firebase/firebase.js'
import {store} from "@/store";
export default {
  components: {MainNav},
  setup() {
    onMounted(() => {
      console.log('App loaded!');
      auth.onAuthStateChanged((user) => {
        store.user = user;
        console.log('User changed to: ', user);
      })
    });
  }

}


</script>