import Vue from "vue";
import Vuex from "vuex";

import * as types from "./types";

import { getProposals, getVoter } from "@/utils/block";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    noMetaMask: false,
    proposals: [],
    voter: {}
  },
  getters: {
    loading: state => state.loading,
    proposals: state => state.proposals,
    voter: state => state.voter,
    noMetaMask: state => state.noMetaMask
  },
  actions: {
    init({ commit }) {
      getProposals().then(proposals => {
        getVoter().then(voter => {
          commit(types.SET_INIT, { proposals, voter });
        });
      });
    },
    notMetaMask({ commit }) {
      commit(types.NO_METAMASK);
    }
  },
  mutations: {
    [types.SET_INIT](state, { proposals, voter }) {
      state.proposals = proposals;
      state.loading = false;
      state.voter = voter;
    },
    [types.NO_METAMASK](state) {
      state.noMetaMask = true;
    }
  }
});
