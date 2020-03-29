import Vue from "vue";
import Vuex from "vuex";

import * as types from "./types";

import {
  getProposals,
  getVoter,
  vote,
  getChairperson,
  userAccount,
  giveRightToVote,
  isChair,
  delegate,
  getDateEnd
} from "@/utils/block";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    noMetaMask: false,
    proposals: [],
    voter: {},
    chairPerson: "",
    error: false,
    isChair: false,
    dateEnd: 0
  },
  getters: {
    loading: state => state.loading,
    proposals: state => state.proposals,
    voter: state => state.voter,
    noMetaMask: state => state.noMetaMask,
    voterExist: state => !!state.voter,
    isChair: state => userAccount === state.chairPerson,
    canVote: (state, getters) => {
      if (getters.isChair) {
        return !state.voter.voted;
      }
      return (
        getters.voterExist && getters.voter.isCreated && !state.voter.voted
      );
    },
    error: state => state.error,
    userAccount: () => userAccount,
    dateEnd: state => state.dateEnd
  },
  actions: {
    init({ commit }) {
      getProposals().then(proposals => {
        getChairperson().then(chairPerson => {
          isChair().then(isChair => {
            getDateEnd().then(dateEnd => {
              getVoter()
                .then(voter => {
                  commit(types.SET_INIT, {
                    proposals,
                    voter,
                    chairPerson,
                    isChair,
                    dateEnd
                  });
                })
                .catch(() => {
                  commit(types.SET_INIT, {
                    proposals,
                    voter: null,
                    chairPerson,
                    isChair,
                    dateEnd
                  });
                });
            });
          });
        });
      });
    },
    notMetaMask({ commit }) {
      commit(types.NO_METAMASK);
    },
    vote({ commit }, index) {
      vote(index)
        .then(() => {
          commit(types.SET_VOTE, index);
        })
        .catch(() => {
          commit(types.ERROR_VOTE);
        });
    },
    addVoter({ commit }, address) {
      return giveRightToVote(address)
        .then(() => Promise.resolve())
        .catch(() => {
          commit(types.ERROR_VOTE);
        });
    },
    delegateVote({ commit }, address) {
      return delegate(address)
        .then(() => {
          commit(types.SET_DELEGATE);
        })
        .catch(() => {
          commit(types.ERROR_VOTE);
        });
    }
  },
  mutations: {
    [types.SET_INIT](
      state,
      { proposals, voter, chairPerson, isChair, dateEnd }
    ) {
      state.proposals = [];
      proposals.forEach((proposal, index) => {
        state.proposals.push({
          name: proposal[0],
          voteCount: parseInt(proposal[1]),
          index: index
        });
      });
      state.chairPerson = chairPerson;
      state.isChair = isChair;
      state.loading = false;
      state.dateEnd = new Date(parseInt(dateEnd) * 1000);
      if (voter === null) {
        state.voter = null;
      } else {
        state.voter = {
          weight: parseInt(voter[0]),
          voted: voter[1],
          delegate: voter[2],
          vote: voter[3],
          isCreated: voter[4]
        };
      }
    },
    [types.NO_METAMASK](state) {
      state.noMetaMask = true;
    },
    [types.SET_VOTE](state, index) {
      state.proposals[index].voteCount =
        state.proposals[index].voteCount + state.voter.weight;
      state.voter.voted = true;
    },
    [types.SET_DELEGATE](state) {
      state.voter.voted = true;
    },
    [types.ERROR_VOTE](state) {
      state.error = true;
    }
  }
});
