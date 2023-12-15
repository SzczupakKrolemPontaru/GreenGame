<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">GreenGame</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
          <router-link to="/about" class="nav-link" aria-current="page">About</router-link>
          <router-link v-if="!store.user" to="/login" class="nav-link" aria-current="page">Login</router-link>
          <router-link v-if="store.user" to="/account" class="nav-link" aria-current="page">Account</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {store} from "@/store";
</script>

<style scoped>
nav {
  background-color: #333;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 15px;
}
</style>