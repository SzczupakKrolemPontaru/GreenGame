<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <h1 v-if="store.user">Welcome to GreenGame {{store.user.email}}!</h1>
      <h1 v-if="!store.user">Welcome to GreenGame!</h1>
    </div>
  </div>
</template>

<script setup>
import {store} from "@/store"
</script>
