<template>
  <div class="Proposal">
    <div class="Proposal-name">{{ proposal.name }}</div>
    <span>{{ proposal.voteCount }}</span>
    <button v-if="canVote" class="Proposal-button" @click="vote(proposal.index)">Vote</button>
  </div>
</template>

<script>
"use strict";

import { mapGetters } from "vuex";

export default {
  name: "Proposal",
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      canVote: "canVote"
    })
  },
  methods: {
    vote(index) {
      this.$store.dispatch("vote", index);
    }
  }
};
</script>

<style lang="scss">
.Proposal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  padding: 0.5rem;
  &-name {
    font-weight: 800;
    font-size: 20px;
  }
  &-button {
    cursor: pointer;
    border: none;
    background-color: #0277bd;
    color: white;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 5px;
  }
}
</style>