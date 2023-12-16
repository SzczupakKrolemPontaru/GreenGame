<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <h1 v-if="store.user">Welcome to GreenGame {{store.user.email}}!</h1>
      <h1 v-if="!store.user">Welcome to GreenGame!</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
