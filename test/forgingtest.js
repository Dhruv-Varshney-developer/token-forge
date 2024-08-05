const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenForge", function () {
  let TokenForge, tokenForge, MyERC1155Token, myToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy MyERC1155Token contract
    MyERC1155Token = await ethers.getContractFactory("MyERC1155Token");
    myToken = await MyERC1155Token.connect(owner).deploy();
    await myToken.waitForDeployment();

    // Deploy TokenForge contract with the address of the newly deployed MyERC1155Token
    TokenForge = await ethers.getContractFactory("TokenForge");
    tokenForge = await TokenForge.deploy(await myToken.getAddress());
    await tokenForge.waitForDeployment();

    // Mint some tokens for testing
    await myToken.connect(addr1).mint(0, 10);
    await myToken.connect(addr1).mint(1, 10);
    await myToken.connect(addr1).mint(2, 10);
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await tokenForge.getAddress()).to.be.properAddress;
    });
  });

  describe("Forging", function () {
    beforeEach(async function () {
      const tokenForgeAddress = await tokenForge.getAddress();
      await myToken.connect(owner).setApprovalForAll(tokenForgeAddress, true);
      await myToken.connect(addr1).setApprovalForAll(tokenForgeAddress, true);
    });

    it("Should forge token 3 correctly", async function () {
      const tokenForgeAddress = await tokenForge.getAddress();
      await expect(tokenForge.connect(addr1).forgeToken([0, 1], [2, 2], 3))
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 0, 2)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 1, 2)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, ethers.ZeroAddress, addr1.address, 3, 2);

      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(8);
      expect(await myToken.balanceOf(addr1.address, 1)).to.equal(8);
      expect(await myToken.balanceOf(addr1.address, 3)).to.equal(2);
    });

    it("Should forge token 4 correctly", async function () {
      const tokenForgeAddress = await tokenForge.getAddress();
      await expect(tokenForge.connect(addr1).forgeToken([1, 2], [3, 3], 4))
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 1, 3)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 2, 3)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, ethers.ZeroAddress, addr1.address, 4, 3);

      expect(await myToken.balanceOf(addr1.address, 1)).to.equal(7);
      expect(await myToken.balanceOf(addr1.address, 2)).to.equal(7);
      expect(await myToken.balanceOf(addr1.address, 4)).to.equal(3);
    });

    it("Should forge token 5 correctly", async function () {
      const tokenForgeAddress = await tokenForge.getAddress();
      await expect(tokenForge.connect(addr1).forgeToken([0, 2], [1, 1], 5))
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 0, 1)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 2, 1)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, ethers.ZeroAddress, addr1.address, 5, 1);

      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(9);
      expect(await myToken.balanceOf(addr1.address, 2)).to.equal(9);
      expect(await myToken.balanceOf(addr1.address, 5)).to.equal(1);
    });

    it("Should forge token 6 correctly", async function () {
      const tokenForgeAddress = await tokenForge.getAddress();
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 1, 2], [1, 1, 1], 6),
      )
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 0, 1)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 1, 1)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, addr1.address, ethers.ZeroAddress, 2, 1)
        .to.emit(myToken, "TransferSingle")
        .withArgs(tokenForgeAddress, ethers.ZeroAddress, addr1.address, 6, 1);

      expect(await myToken.balanceOf(addr1.address, 0)).to.equal(9);
      expect(await myToken.balanceOf(addr1.address, 1)).to.equal(9);
      expect(await myToken.balanceOf(addr1.address, 2)).to.equal(9);
      expect(await myToken.balanceOf(addr1.address, 6)).to.equal(1);
    });

    it("Should revert if burn amounts are not equal", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 1], [1, 2], 3),
      ).to.be.revertedWith("All burn amounts must be equal");
    });

    it("Should revert if forge is invalid", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 2], [1, 1], 3),
      ).to.be.revertedWith("Invalid forge. Please check forging instructions.");
    });

    it("Should revert if burn and mint IDs are mismatched", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0], [1], 3),
      ).to.be.revertedWith("Invalid forge. Please check forging instructions.");
    });

    it("Should revert if burnIds and burnAmounts have different lengths", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 1], [1], 3),
      ).to.be.revertedWith(
        "Mismatched burn data. Please provide burnAmounts for all burnIDs and vice versa.",
      );
    });

    it("Should revert if trying to forge an invalid token ID", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 1], [1, 1], 7),
      ).to.be.revertedWith("Invalid forge. Please check forging instructions.");
    });

    it("Should revert if there are duplicate burnIds", async function () {
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 0], [1, 1], 3),
      ).to.be.revertedWith("Invalid forge. Please check forging instructions.");
    });

    it("Should revert if user doesn't have enough tokens to burn", async function () {
      await myToken.connect(addr1).burn(addr1.address, 0, 10);
      await expect(
        tokenForge.connect(addr1).forgeToken([0, 1], [1, 1], 3),
      ).to.be.revertedWithCustomError(myToken, "ERC1155InsufficientBalance");
    });
  });

  describe("isValidForge", function () {
    it("Should return true for valid forge combinations", async function () {
      expect(await tokenForge.isValidForge([0, 1], 3)).to.be.true;
      expect(await tokenForge.isValidForge([1, 2], 4)).to.be.true;
      expect(await tokenForge.isValidForge([0, 2], 5)).to.be.true;
      expect(await tokenForge.isValidForge([0, 1, 2], 6)).to.be.true;
    });

    it("Should return false for invalid mint IDs", async function () {
      expect(await tokenForge.isValidForge([0, 1], 7)).to.be.false;
    });

    it("Should return false for invalid burn ID combinations", async function () {
      expect(await tokenForge.isValidForge([0, 2], 3)).to.be.false;
      expect(await tokenForge.isValidForge([0, 1], 4)).to.be.false;
      expect(await tokenForge.isValidForge([1, 2], 5)).to.be.false;
      expect(await tokenForge.isValidForge([0, 1], 6)).to.be.false;
    });
  });

  describe("checkForge", function () {
    it("Should return true for valid forge combinations", async function () {
      expect(await tokenForge.checkForge([0, 1], [0, 1])).to.be.true;
      expect(await tokenForge.checkForge([1, 2], [1, 2])).to.be.true;
      expect(await tokenForge.checkForge([0, 2], [0, 2])).to.be.true;
      expect(await tokenForge.checkForge([0, 1, 2], [0, 1, 2])).to.be.true;
    });

    it("Should return false if burnIds and requiredIds have different lengths", async function () {
      expect(await tokenForge.checkForge([0], [0, 1])).to.be.false;
    });

    it("Should return false if burnIds don't match requiredIds", async function () {
      expect(await tokenForge.checkForge([0, 2], [0, 1])).to.be.false;
    });

    it("Should return false if there are duplicate burnIds", async function () {
      expect(await tokenForge.checkForge([0, 0], [0, 1])).to.be.false;
    });
  });
});
