<template>
  <div id="app">
    <template v-if="!noMetaMask">
      <template v-if="!loading">
        <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/delegate">Délégation</router-link>
        </div>
        <router-view />
      </template>
      <div v-else>Chargement</div>
    </template>
    <div v-else>MetaMask manquant</div>
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
      noMetaMask: "noMetaMask"
    })
  }
};
</script>

<style lang="scss">
</style>