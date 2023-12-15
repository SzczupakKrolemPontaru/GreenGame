<template>
<div>
  <h1>Account info</h1>
  <h3 v-if="user && user.email">Email: {{user.email}}</h3>
  <h3 v-if="user && user.name">Name: {{user.name}}</h3>
  <div>
    <button v-if="user" class="btn btn-lg btn-outline-dark" @click="this.logout()">
    Logout
  </button>
  </div>


</div>
</template>
<script>
import {store} from "@/store";

export default {
  name: "AccountView",
  data() {
    return {
      user: store.user
    }
  },
  methods: {
    logout() {
      store.user = null;
      this.$router.push('/');
    }
  },
}

</script>

<style scoped>

</style>