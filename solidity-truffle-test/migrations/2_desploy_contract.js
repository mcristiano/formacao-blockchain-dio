const MFC = artifacts.require("MyFirstContract");

module.exports = function(deployer) {
  deployer.deploy(MFC);
};