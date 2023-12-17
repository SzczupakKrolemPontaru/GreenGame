<template>
  <div class="home">
    <div>
      <h1 v-if="store.user && !store.user.name">Witaj w GreenGame! Dzięki za założenie konta!</h1>
      <h1 v-if="store.user && store.user.name">Witaj w GreenGame {{store.user.name}}!</h1>
      <h1 v-if="!store.user">Witaj w GreenGame!</h1>
    </div>

    <div v-if="!store.user" class="container mt-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Jak zacząć?</h5>
          <p class="card-text">1. Stwórz nowe konto w zakładce "Logowanie"</p>
          <p class="card-text">2. Automatycznie trafisz do Menu Głównego, gdzie możesz zacząć korzystać z GreenGame</p>
          <p class="card-text">3. W razie potrzeby wróć tutaj. Dowiesz się jak najlepiej korzystać z GreenGame!</p>
        </div>
      </div>
    </div>

    <div v-if="store.user" class="container mt-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Jak korzystać z GreenGame?</h5>
          <p class="card-text">1. Zarządzaj swoją postacią w Menu Głównym</p>
          <p class="card-text">2. Wypełniaj Quizy (będą Ci potrzebne do zabawy w MiniGry)</p>
          <p class="card-text">3. Graj w MiniGry sam lub ze znajomymi, pobijaj rekordy i zdobywaj nowe poziomy umiejętności</p>
          <p class="card-text">4. Miłej zabawy (i nauki o ekologii 🤓)!</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import {store} from "@/store"
// import {getCharacterByUser} from "@/firebase/characterDAO";
//
// const getCharacter = async () => {
//   await getCharacterByUser(store.user.uid);
// }
</script>