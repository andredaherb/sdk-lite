var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var sdk_lite_exports = {};
__export(sdk_lite_exports, {
  default: () => sdk_lite_default
});
module.exports = __toCommonJS(sdk_lite_exports);

// lib/api/cryptum-api-instance.ts
var import_axios = __toESM(require("./node_modules/axios/index.js"));

// lib/api/config.ts
var getBaseUrl = (environment) => {
  if (environment === "testnet")
    return "https://api-hml.cryptum.io";
  if (environment === "mainnet")
    return "https://api.cryptum.io";
  throw new Error(`Unknown environment ${environment}.`);
};

// lib/api/cryptum-api-instance.ts
var getCryptumAxiosInstance = (config) => import_axios.default.create({
  baseURL: getBaseUrl("testnet"),
  headers: {
    "x-api-key": config.apiKey
  }
});
var cryptum_api_instance_default = getCryptumAxiosInstance;

// lib/api/token-api.ts
var getTokenInfoBuilder = async ({ tokenAddress, protocol }, config) => {
  try {
    const res = await cryptum_api_instance_default(config).get(
      `/token/${tokenAddress}/info?protocol=${protocol}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

// lib/api/transaction-api.ts
var sendTransactionBuilder = async (config, transaction) => {
  const service = cryptum_api_instance_default(config.connection);
  const { signedTx, type } = transaction;
  const response = await service.post(
    "/transaction",
    { signedTx, type },
    {
      params: { protocol: config.protocol.protocol }
    }
  );
  return response.data;
};

// lib/api/wallet-api.ts
var getWalletInfoBuilder = async ({ address, tokenAddresses = [] }, config) => {
  const qs = [
    `protocol=${config.protocol.protocol}`,
    ...tokenAddresses.map((address2) => `tokenAddresses[]=${address2}`)
  ];
  const res = await cryptum_api_instance_default(config.connection).get(
    `/wallet/${address}/info?${qs.join("&")}`
  );
  return res.data;
};

// lib/api/index.ts
var getCryptumApi = (config) => ({
  getTokenInfo: (input) => getTokenInfoBuilder(input, config.connection),
  getWalletInfo: (input) => getWalletInfoBuilder(input, config),
  sendTransaction: (input) => sendTransactionBuilder(config, input)
});
var api_default = getCryptumApi;

// lib/evm-compatible/create-wallet.ts
var import_ethereumjs_wallet = require("./node_modules/ethereumjs-wallet/dist/index.js");
var import_bip39 = require("./node_modules/bip39/src/index.js");

// lib/evm-compatible/wallets/get-derivation-path.ts
var fixedPurposeBip44 = 44;
var externalChainChange = "0";
var protocolToDerivationPathCoinMap = {
  BITCOIN: "0",
  ETHEREUM: "60",
  POLYGON: "60",
  CELO: "52752",
  HATHOR: "280",
  CARDANO: "1852",
  AVALANCHE: "9000",
  SOLANA: "501"
};
var getDerivationPath = ({
  protocol,
  account = 0,
  address = 0
}) => `m/${fixedPurposeBip44}'/${protocolToDerivationPathCoinMap[protocol]}'/${String(account)}'/${externalChainChange}/${String(address)}`;
var get_derivation_path_default = getDerivationPath;

// lib/evm-compatible/create-wallet.ts
var createWallet = (protocol) => {
  const mnemonic = (0, import_bip39.generateMnemonic)();
  const derivedPath = import_ethereumjs_wallet.hdkey.fromMasterSeed((0, import_bip39.mnemonicToSeedSync)(mnemonic)).derivePath(get_derivation_path_default({ protocol, account: 0, address: 0 }));
  const wallet = derivedPath.getWallet();
  return {
    mnemonic,
    address: wallet.getAddressString().toLowerCase(),
    privateKey: wallet.getPrivateKeyString(),
    publicKey: wallet.getPublicKeyString(),
    xpub: derivedPath.publicExtendedKey().toString("hex")
  };
};
var buildCreateWallet = (protocol) => () => createWallet(protocol);
var create_wallet_default = buildCreateWallet;

// lib/abis/index.ts
var TRANSFER_METHOD_ABI = [
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

// lib/abis/chains.ts
var POLYGON_COMMON_CHAIN = {
  testnet: {
    base: "rinkeby",
    chain: {
      chainId: 80001,
      networkId: 80001
    }
  },
  mainnet: {
    base: "mainnet",
    chain: {
      chainId: 137,
      networkId: 137
    }
  }
};

// lib/utils/index.ts
var import_bignumber = __toESM(require("./node_modules/bignumber.js/bignumber.mjs"));
var toWei = (eth, decimals = 18) => new import_bignumber.default(eth).times(`1e${decimals}`);

// lib/evm-compatible/transfer.ts
var import_common = __toESM(require("./node_modules/@ethereumjs/common/dist/index.js"));
var import_tx = require("./node_modules/@ethereumjs/tx/dist/index.js");
var import_bignumber2 = __toESM(require("./node_modules/bignumber.js/bignumber.mjs"));
var import_ethereumjs_wallet2 = __toESM(require("./node_modules/ethereumjs-wallet/dist/index.js"));

// lib/api/fee-api.ts
var getFee = async (txData, config) => {
  try {
    const response = await cryptum_api_instance_default(config).post(
      `/fee?protocol=${txData.protocol}`,
      txData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// lib/evm-compatible/transfer.ts
var Web3 = require("./node_modules/web3/lib/index.js");
var buildPolygonTransferTransaction = function({
  fromPrivateKey,
  nonce,
  tokenSymbol,
  contractAddress,
  amount,
  destination,
  fee,
  testnet,
  decimals
}, config) {
  const { gas, gasPrice, chainId } = fee;
  const web3 = new Web3("ws://localhost:8546");
  const rawTransaction = {
    chainId,
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    to: "",
    value: void 0,
    data: void 0,
    gasLimit: web3.utils.toHex(new import_bignumber2.default(gas).plus(1e5).toString())
  };
  const value = toWei(amount, decimals);
  rawTransaction.to = contractAddress;
  const token = new web3.eth.Contract(TRANSFER_METHOD_ABI, rawTransaction.to);
  rawTransaction.data = token.methods.transfer(destination, value).encodeABI();
  const tx = new import_tx.Transaction(rawTransaction, {
    common: import_common.default.custom({
      chainId: POLYGON_COMMON_CHAIN[config.connection.environment].chain.chainId
    })
  });
  const signedTx = tx.sign(Buffer.from(fromPrivateKey.substring(2), "hex"));
  return `0x${signedTx.serialize().toString("hex")}`;
};
var transfer = async ({
  privateKey,
  tokenSymbol,
  amount,
  destination,
  contractAddress
}, config) => {
  const protocol = config.protocol.protocol;
  const { decimals } = await api_default(config).getTokenInfo({
    tokenAddress: contractAddress,
    protocol
  });
  const feeInfo = await getFee(
    {
      protocol: config.protocol.protocol,
      type: "TRANSFER",
      from: import_ethereumjs_wallet2.default.fromPrivateKey(
        Buffer.from(privateKey.substring(2), "hex")
      ).getAddressString(),
      destination
    },
    config.connection
  );
  const { nonce } = await api_default(config).getWalletInfo({
    address: import_ethereumjs_wallet2.default.fromPrivateKey(
      Buffer.from(privateKey.substring(2), "hex")
    ).getAddressString()
  });
  const signedTx = buildPolygonTransferTransaction(
    {
      fromPrivateKey: privateKey,
      tokenSymbol,
      amount,
      destination,
      fee: feeInfo,
      nonce,
      testnet: config.connection.environment === "testnet",
      contractAddress,
      decimals
    },
    config
  );
  const res = await api_default(config).sendTransaction({
    signedTx,
    type: "TRANSFER"
  });
  return res.hash;
};
var transfer_default = (config) => (input) => transfer(input, config);

// lib/builder.ts
var buildSdk = (config) => {
  const cryptumApi = api_default(config);
  return {
    createWallet: create_wallet_default(config.protocol.protocol),
    transfer: transfer_default(config),
    ...cryptumApi
  };
};
var builder_default = buildSdk;

// index.ts
var sdk_lite_default = builder_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
