<template>
  <div class="home">
    <div>
      <h1 v-if="store.user">Welcome to GreenGame {{store.user.email}}!</h1>
      <h1 v-if="!store.user">Welcome to GreenGame!</h1>
    </div>
  </div>
</template>

<script setup>
import {store} from "@/store"
</script>