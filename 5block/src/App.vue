<template>
  <div id="app">
    <template v-if="!noMetaMask">
      <template v-if="!loading">
        <div id="nav">
          <router-link to="/">Vote</router-link>
          <router-link v-if="canVote" to="/delegate">Délégation</router-link>
          <router-link v-if="isChair" to="/voter">Ajouter un votant</router-link>
        </div>
        <div v-if="error" class="App-error">Une erreur est arrivé.</div>
        <router-view />
      </template>
      <div v-else class="App-loading">
        <span>Chargement</span>
      </div>
    </template>
    <div v-else class="App-loading">
      <span>MetaMask manquant</span>
    </div>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      loading: "loading",
      noMetaMask: "noMetaMask",
      error: "error",
      isChair: "isChair",
      canVote: "canVote"
    })
  }
};
</script>

<style lang="scss">
#nav {
  display: flex;
  justify-content: center;
  > a {
    margin: 0.5rem;
  }
}
.App {
  &-error {
    padding: 0.5rem;
    color: red;
  }
  &-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>