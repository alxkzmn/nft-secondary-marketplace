/*
 * Copyright (c) 2021 Alexander Kuzmin
 * SPDX-License-Identifier: MIT
 */
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    address _marketplaceAddress;

    constructor(address marketplaceAddress) ERC721("TrustyGoods", "TRST") {
        _marketplaceAddress = marketplaceAddress;
    }

    function createToken(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        setApprovalForAll(_marketplaceAddress, true);
        return newItemId;
    }
}
