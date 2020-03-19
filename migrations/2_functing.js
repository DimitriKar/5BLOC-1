const Ballot = artifacts.require("Ballot.sol");
const SafeMath = artifacts.require("SafeMath.sol");

module.exports = function(deployer, _network, _accounts) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, Ballot);
  deployer.deploy(Ballot, ["Adrien", "Nhans"], 1594625480);
};
