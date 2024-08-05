const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyERC1155TokenModule", (m) => {
  const myERC1155Token = m.contract("MyERC1155Token", [], {
    args: [],
  });

  return { myERC1155Token };
});
