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

    constructor() ERC1155("ipfs://bafybeihrklb222sgiowrjceg76rmqqpzqiyujmnufv3cq57ssemdxbbe4u/{id}") Ownable(msg.sender){}

    function mint(uint256 id, uint256 amount) public {
        require(id >= TOKEN_0 && id <= TOKEN_2, "Invalid token ID for public minting");
        require(block.timestamp >= lastMintTime[msg.sender][id] + 1 minutes, "Mint cooldown");

        lastMintTime[msg.sender][id] = block.timestamp;
        _mint(msg.sender, id, amount, "");
    }

    function forgeMint(address to, uint256 id, uint256 amount) external onlyOwner {
        require(id >= TOKEN_3 && id <= TOKEN_6, "Invalid token ID for forging");
        _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(msg.sender == from || isApprovedForAll(from, msg.sender), "Caller is not owner nor approved");
        _burn(from, id, amount);
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(id), id.toString()));
    }
}
