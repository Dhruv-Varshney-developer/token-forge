const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenForgeModule", (m) => {
  const tokenForge = m.contract("TokenForge", [], {
    args: [],
  });

  return { tokenForge };
});
