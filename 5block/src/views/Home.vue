<template>
  <div>{{ proposals }}</div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      proposals: "proposals"
    })
  }
};
</script>

<style lang="scss">
</style>