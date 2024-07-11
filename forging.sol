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

        tokenContract.forgeMint(msg.sender, mintId, 1);
    }

    function isValidForge(uint256[] memory burnIds, uint256 mintId) internal pure returns (bool) {
        if (mintId == 3) {
            uint256[] memory requiredIds = new uint256[](2);
            requiredIds[0] = 0;
            requiredIds[1] = 1;
            return checkForge(burnIds, requiredIds);
        }
        if (mintId == 4) {
            uint256[] memory requiredIds = new uint256[](2);
            requiredIds[0] = 1;
            requiredIds[1] = 2;
            return checkForge(burnIds, requiredIds);
        }
        if (mintId == 5) {
            uint256[] memory requiredIds = new uint256[](2);
            requiredIds[0] = 0;
            requiredIds[1] = 2;
            return checkForge(burnIds, requiredIds);
        }
        if (mintId == 6) {
            uint256[] memory requiredIds = new uint256[](3);
            requiredIds[0] = 0;
            requiredIds[1] = 1;
            requiredIds[2] = 2;
            return checkForge(burnIds, requiredIds);
        }
        return false;
    }

    function checkForge(uint256[] memory burnIds, uint256[] memory requiredIds) internal pure returns (bool) {
        if (burnIds.length != requiredIds.length) return false;
        bool[] memory found = new bool[](requiredIds.length);
        for (uint256 i = 0; i < burnIds.length; i++) {
            for (uint256 j = 0; j < requiredIds.length; j++) {
                if (burnIds[i] == requiredIds[j] && !found[j]) {
                    found[j] = true;
                    break;
                }
            }
        }
        for (uint256 i = 0; i < found.length; i++) {
            if (!found[i]) return false;
        }
        return true;
    }
}
