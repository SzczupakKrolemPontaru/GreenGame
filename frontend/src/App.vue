<template>
  <MainNav v-if="!$route.meta.hideNavbar" />
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
import {onBeforeMount} from "vue";
import {auth} from './firebase/firebase.js'
import {UserDAO} from "@/firebase/userDAO";
import {store} from "@/store";
export default {
  components: {MainNav},
  setup() {
    const storedUser = localStorage.getItem('user');
    const userDAO = new UserDAO();
    store.user = storedUser ? JSON.parse(storedUser) : null;
    onBeforeMount(() => {
      console.log('User init');
      auth.onAuthStateChanged(async (user) => {
        await userDAO.storeUserObject(user);
      })
    });
  }
}

</script>