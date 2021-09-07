/*
 * Copyright (c) 2021 Alexander Kuzmin
 * SPDX-License-Identifier: MIT
 */
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    const [_, buyer] = await ethers.getSigners();

    await nft.connect(buyer).createToken("ipfs://metadata1");
    await nft.connect(buyer).createToken("ipfs://metadata2");

    await market.connect(buyer).createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.connect(buyer).createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const itemsBefore = await market.fetchMarketItems();
    assert.equal(itemsBefore.length, 2);

    await market.connect(buyer).createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    const itemsAfter = await market.fetchMarketItems();
    assert.equal(itemsAfter.length, 1);

    const items = await market.connect(buyer).fetchItemsCreated();
    assert.equal(items.length, 2);
  });
});
