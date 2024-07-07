// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "module-3/ERC1155token.sol";

contract TokenForge {
    MyERC1155Token private tokenContract;

    constructor(MyERC1155Token _tokenContract) {
        tokenContract = _tokenContract;
    }

    function forgeToken(uint256[] memory burnIds, uint256[] memory burnAmounts, uint256 mintId) public {
        require(burnIds.length == burnAmounts.length, "Mismatched burn data");
        require(isValidForge(burnIds, mintId), "Invalid forge");

        for (uint256 i = 0; i < burnIds.length; i++) {
            tokenContract.burn(msg.sender, burnIds[i], burnAmounts[i]);
        }

        tokenContract.mint(mintId, 1);
    }

    function isValidForge(uint256[] memory burnIds, uint256 mintId) internal pure returns (bool) {
        if (mintId == 3) return burnIds.length == 2 && burnIds[0] == 0 && burnIds[1] == 1;
        if (mintId == 4) return burnIds.length == 2 && burnIds[0] == 1 && burnIds[1] == 2;
        if (mintId == 5) return burnIds.length == 2 && burnIds[0] == 0 && burnIds[1] == 2;
        if (mintId == 6) return burnIds.length == 3 && burnIds[0] == 0 && burnIds[1] == 1 && burnIds[2] == 2;
        return false;
    }
}
