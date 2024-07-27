// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC1155Token is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public constant TOKEN_0 = 0;
    uint256 public constant TOKEN_1 = 1;
    uint256 public constant TOKEN_2 = 2;
    uint256 public constant TOKEN_3 = 3;
    uint256 public constant TOKEN_4 = 4;
    uint256 public constant TOKEN_5 = 5;
    uint256 public constant TOKEN_6 = 6;

    mapping(address => mapping(uint256 => uint256)) public lastMintTime;

    constructor()
        ERC1155(
            "ipfs://bafybeiaan5hx3tfk4vs4qp3l7efg2dyydlt3mjs7egduhlsuwylafnlrrm/{id}"
        )
        Ownable(msg.sender)
    {}

    function mint(uint256 id, uint256 amount) public {
        require(
            id >= TOKEN_0 && id <= TOKEN_2,
            "Free minting is allowed only for token IDs 0-2"
        );
        require(
            block.timestamp >= lastMintTime[msg.sender][id] + 1 minutes,
            "There is a cooldown of 1 minute between free mints."
        );

        lastMintTime[msg.sender][id] = block.timestamp;
        _mint(msg.sender, id, amount, "");
    }

    function forgeMint(address to, uint256 id, uint256 amount) public {
        require(
            owner() == msg.sender || isApprovedForAll(owner(), msg.sender),
            "Caller is not the owner nor approved."
        );
        require(
            id >= TOKEN_3 && id <= TOKEN_6,
            "Using forgeMint, you can only mint IDs 3-6. "
        );
        _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(
            msg.sender == from || isApprovedForAll(from, msg.sender),
            "Caller is not owner nor approved."
        );
        _burn(from, id, amount);
    }

    function uri(uint256 id) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "ipfs://bafybeiaan5hx3tfk4vs4qp3l7efg2dyydlt3mjs7egduhlsuwylafnlrrm/",
                    id.toString()
                )
            );
    }

    function tradeToken(
        uint256 giveTokenId,
        uint256 giveAmount,
        uint256 receiveTokenId
    ) public {
        require(
            giveTokenId != receiveTokenId,
            "Cannot trade for the same token type"
        );
        require(
            receiveTokenId >= TOKEN_0 && receiveTokenId <= TOKEN_2,
            "Can only trade for token IDs 0-2"
        );
        require(
            balanceOf(msg.sender, giveTokenId) >= giveAmount,
            "Insufficient balance of token to give"
        );

        // Perform the trade
        _burn(msg.sender, giveTokenId, giveAmount);
        _mint(msg.sender, receiveTokenId, giveAmount, "");
    }
}
// gas optimisation-100000
