/*
 * Copyright (c) 2021 Alexander Kuzmin
 * SPDX-License-Identifier: MIT
 */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraProjectId}`,
      accounts: [accountPrivateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
      accounts: [accountPrivateKey],
    },
  },
  solidity: "0.8.4",
};
