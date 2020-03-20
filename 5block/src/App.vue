<template>
  <div id="app">
    <template v-if="!noMetaMask">
      <template v-if="!loading">
        <div class="App-date">Fin du vote :{{ dateFormated }}</div>
        <div id="nav" class="App-nav">
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
      canVote: "canVote",
      dateEnd: "dateEnd"
    }),
    dateFormated() {
      return `${this.dateEnd.getDate()}/${this.dateEnd.getMonth()}/${this.dateEnd.getFullYear()}`;
    }
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
  &-date {
    text-align: center;
  }
  &-nav {
    margin: 0.5rem 0;
  }
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