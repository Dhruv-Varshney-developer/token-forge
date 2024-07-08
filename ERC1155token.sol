// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC1155Token is ERC1155,Ownable  {
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
        require(id >= TOKEN_0 && id <= TOKEN_2, "Invalid token ID");
        require(block.timestamp >= lastMintTime[msg.sender][id] + 1 minutes, "Mint cooldown");

        lastMintTime[msg.sender][id] = block.timestamp;
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(msg.sender == from || isApprovedForAll(from, msg.sender), "Caller is not owner nor approved");
        _burn(from, id, amount);
    }

    function burnBatch(address from, uint256[] memory ids, uint256[] memory amounts) public {
        require(msg.sender == from || isApprovedForAll(from, msg.sender), "Caller is not owner nor approved");
        _burnBatch(from, ids, amounts);
    }

    function uri(uint256 id) public view override returns (string memory) {
    return string(abi.encodePacked(super.uri(id),id.toString()));
}

}
