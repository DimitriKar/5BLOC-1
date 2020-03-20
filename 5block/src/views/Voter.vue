<template>
  <div class="Voter">
    <label>Adresse du votant</label>
    <input v-model="voter" class="Voter-input" />
    <button @click="addVoter" class="Voter-button">Ajouter un votant</button>
  </div>
</template>

<script>
"use strict";

export default {
  name: "Voter",
  data() {
    return {
      voter: ""
    };
  },
  methods: {
    addVoter() {
      if (this.voter === "") return;
      this.$store.dispatch("addVoter", this.voter).then(() => {
        this.voter = "";
      });
    }
  }
};
</script>

<style lang="scss">
.Voter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  &-input {
    width: 400px;
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