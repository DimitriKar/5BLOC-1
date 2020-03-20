<template>
  <div>
    <Proposal
      class="Home-proposals"
      v-for="proposal in proposals"
      :key="proposal.item"
      :proposal="proposal"
    />
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

import Proposal from "@/components/Proposal";

export default {
  name: "Home",
  components: {
    Proposal
  },
  computed: {
    ...mapGetters({
      proposals: "proposals"
    })
  }
};
</script>

<style lang="scss">
.Home {
  &-proposals {
    &:nth-child(even) {
      background-color: #eeeeee;
    }
  }
}
</style>