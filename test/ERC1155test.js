const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("MyERC1155Token", function () {
  let MyERC1155Token, myToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyERC1155Token = await ethers.getContractFactory("MyERC1155Token");
    myToken = await MyERC1155Token.deploy();
    await myToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should have the correct URI", async function () {
      expect(await myToken.uri(0)).to.equal(
        "ipfs://bafybeiaan5hx3tfk4vs4qp3l7efg2dyydlt3mjs7egduhlsuwylafnlrrm/0",
      );
    });

    it("Should return correct URI for different token IDs", async function () {
      expect(await myToken.uri(1)).to.equal(
        "ipfs://bafybeiaan5hx3tfk4vs4qp3l7efg2dyydlt3mjs7egduhlsuwylafnlrrm/1",
      );
      expect(await myToken.uri(100)).to.equal(
        "ipfs://bafybeiaan5hx3tfk4vs4qp3l7efg2dyydlt3mjs7egduhlsuwylafnlrrm/100",
      );
    });
  });

  describe("Minting", function () {
    it("Should allow minting of tokens 0-2", async function () {
      await myToken.connect(addr1).mint(0, 1);
      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(1);

      await myToken.connect(addr1).mint(1, 2);
      expect(await myToken.balanceOf(addr1.address, 1)).to.equal(2);

      await myToken.connect(addr1).mint(2, 3);
      expect(await myToken.balanceOf(addr1.address, 2)).to.equal(3);
    });

    it("Should not allow minting of tokens 3-6", async function () {
      await expect(myToken.connect(addr1).mint(3, 1)).to.be.revertedWith(
        "Free minting is allowed only for token IDs 0-2",
      );
      await expect(myToken.connect(addr1).mint(6, 1)).to.be.revertedWith(
        "Free minting is allowed only for token IDs 0-2",
      );
    });

    it("Should enforce cooldown between mints", async function () {
      await myToken.connect(addr1).mint(0, 1);
      await expect(myToken.connect(addr1).mint(0, 1)).to.be.revertedWith(
        "There is a cooldown of 1 minute between free mints.",
      );

      // Fast forward time by 1 minute
      await time.increase(60);

      await expect(myToken.connect(addr1).mint(0, 1)).to.not.be.reverted;
    });

    it("Should allow minting different token IDs without cooldown", async function () {
      await myToken.connect(addr1).mint(0, 1);
      await expect(myToken.connect(addr1).mint(1, 1)).to.not.be.reverted;
      await expect(myToken.connect(addr1).mint(2, 1)).to.not.be.reverted;
    });
  });

  describe("ForgeMint", function () {
    it("Should allow owner to forge mint tokens 3-6", async function () {
      await myToken.connect(owner).forgeMint(addr1.address, 3, 1);
      expect(await myToken.balanceOf(addr1.address, 3)).to.equal(1);

      await myToken.connect(owner).forgeMint(addr1.address, 4, 2);
      expect(await myToken.balanceOf(addr1.address, 4)).to.equal(2);

      await myToken.connect(owner).forgeMint(addr1.address, 5, 3);
      expect(await myToken.balanceOf(addr1.address, 5)).to.equal(3);

      await myToken.connect(owner).forgeMint(addr1.address, 6, 4);
      expect(await myToken.balanceOf(addr1.address, 6)).to.equal(4);
    });

    it("Should not allow non-owners to forge mint", async function () {
      await expect(
        myToken.connect(addr1).forgeMint(addr2.address, 3, 1),
      ).to.be.revertedWith("Caller is not the owner nor approved.");
    });

    it("Should not allow forge minting of tokens 0-2", async function () {
      await expect(
        myToken.connect(owner).forgeMint(addr1.address, 0, 1),
      ).to.be.revertedWith("Using forgeMint, you can only mint IDs 3-6. ");
      await expect(
        myToken.connect(owner).forgeMint(addr1.address, 2, 1),
      ).to.be.revertedWith("Using forgeMint, you can only mint IDs 3-6. ");
    });

    it("Should allow approved address to forge mint", async function () {
      await myToken.connect(owner).setApprovalForAll(addr1.address, true);
      await expect(myToken.connect(addr1).forgeMint(addr2.address, 3, 1)).to.not
        .be.reverted;
      expect(await myToken.balanceOf(addr2.address, 3)).to.equal(1);
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      await myToken.connect(addr1).mint(0, 2);
      await myToken.connect(owner).forgeMint(addr1.address, 3, 2);
    });

    it("Should allow burning of owned tokens", async function () {
      await myToken.connect(addr1).burn(addr1.address, 0, 1);
      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(1);

      await myToken.connect(addr1).burn(addr1.address, 3, 1);
      expect(await myToken.balanceOf(addr1.address, 3)).to.equal(1);
    });

    it("Should not allow burning of tokens not owned", async function () {
      await expect(
        myToken.connect(addr2).burn(addr1.address, 0, 1),
      ).to.be.revertedWith("Caller is not owner nor approved.");
    });

    it("Should allow approved address to burn tokens", async function () {
      await myToken.connect(addr1).setApprovalForAll(addr2.address, true);
      await expect(myToken.connect(addr2).burn(addr1.address, 0, 1)).to.not.be
        .reverted;
      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(1);
    });
  });

  describe("Trading", function () {
    beforeEach(async function () {
      await myToken.connect(addr1).mint(0, 2);
    });

    it("Should allow trading between token types 0-2", async function () {
      await myToken.connect(addr1).tradeToken(0, 1, 1);
      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(1);
      expect(await myToken.balanceOf(addr1.address, 1)).to.equal(1);

      await myToken.connect(addr1).tradeToken(0, 1, 2);
      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(0);
      expect(await myToken.balanceOf(addr1.address, 2)).to.equal(1);
    });

    it("Should not allow trading for the same token type", async function () {
      await expect(
        myToken.connect(addr1).tradeToken(0, 1, 0),
      ).to.be.revertedWith("Cannot trade for the same token type");
    });

    it("Should not allow trading for token types 3-6", async function () {
      await expect(
        myToken.connect(addr1).tradeToken(0, 1, 3),
      ).to.be.revertedWith("Can only trade for token IDs 0-2");
      await expect(
        myToken.connect(addr1).tradeToken(0, 1, 6),
      ).to.be.revertedWith("Can only trade for token IDs 0-2");
    });

    it("Should not allow trading more tokens than owned", async function () {
      await expect(
        myToken.connect(addr1).tradeToken(0, 3, 1),
      ).to.be.revertedWith("Insufficient balance of token to give");
    });
  });
});
