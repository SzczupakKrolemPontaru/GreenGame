<template>
  <div class="home">
    <div>
      <h1 v-if="store.user">Welcome to GreenGame {{store.user.name}}!</h1>
      <h1 v-if="!store.user">Welcome to GreenGame!</h1>
      <button v-if="store.user" @click="getCharacter" class="btn btn-primary">Get my character!</button>
    </div>
  </div>
</template>

<script setup>
import {store} from "@/store"
import {getCharacterByUser} from "@/firebase/characterDAO";

const getCharacter = async () => {
  await getCharacterByUser(store.user.uid);
}
</script>