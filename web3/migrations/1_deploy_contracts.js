const RegenRetire = artifacts.require("RegenRetire");

module.exports = function(deployer) {
  deployer.deploy(RegenRetire);
  deployer.link(RegenRetire);
};
