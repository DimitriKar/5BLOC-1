import ABI from "./ABI";
import Web3 from "web3";
import store from "@/store";

let contract;
let web3js;
let userAccount;

const getWeb3js = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    return web3;
  }
};

const startApp = async () => {
  web3js = await getWeb3js();

  let address = "0x7F6fe9bfFc3e48F3415fa139DA42565EB5Cfab67";
  contract = new web3js.eth.Contract(ABI, address);

  userAccount = await web3js.eth.getAccounts()[0];

  setInterval(async function() {
    const accounts = await web3js.eth.getAccounts();
    if (accounts[0] !== userAccount) {
      userAccount = accounts[0];
      store.dispatch("init");
    }
  }, 100);
  store.dispatch("init");
};

const getChairperson = () => {
  return contract.methods.chairperson().call();
};

const alreadyVote = () => {
  return contract.methods.alreadyVote().call();
};

const getDateEnd = () => {
  return contract.methods.dateEnd().call();
};

const delegate = address => {
  return contract.methods.delegate(address).call();
};

const giveRightToVote = address => {
  return contract.methods.giveRightToVote(address).call();
};

const getProposal = id => {
  return contract.methods.proposals(id).call();
};

const getProposals = () => {
  return contract.methods.getProposalList().call();
};

const vote = id => {
  return contract.methods.vote(id).call();
};

const voter = address => {
  return contract.methods.voters(address).call();
};

const winnerName = () => {
  return contract.methods.winnerName().call();
};

const winningProposal = () => {
  return contract.methods.winningProposal().call();
};

const getVoter = () => {
  return contract.methods.getVoter().call();
};

export {
  contract,
  userAccount,
  startApp,
  getChairperson,
  alreadyVote,
  getDateEnd,
  delegate,
  giveRightToVote,
  getProposal,
  getProposals,
  vote,
  voter,
  winnerName,
  winningProposal,
  getVoter
};
