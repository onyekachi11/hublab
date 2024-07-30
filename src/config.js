import {
  BrowserWalletConnector,
  CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  persistentConnectorType,
  WalletConnectConnector,
} from "@concordium/react-components";

export const DEFAULT_CONTRACT_INDEX = BigInt(9718);
export const DEFAULT_NFT_CONTRACT_INDEX = BigInt(9705);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
export const PING_INTERVAL_MS = 5000;
export const VERIFIER_URL = "http://127.0.0.1:8100/api";

const WALLET_CONNECT_OPTS = {
  projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: "TodoApp",
    description: "Example dApp",
    url: "#",
    icons: ["https://walletconnect.com/walletconnect-logo.png"],
  },
};

export const BROWSER_WALLET = persistentConnectorType(
  BrowserWalletConnector.create
);
export const WALLET_CONNECT = persistentConnectorType(
  WalletConnectConnector.create.bind(this, WALLET_CONNECT_OPTS)
);

// concordium-client contract update food-nft4 --entrypoint mint --energy 3000 --sender my_wallet.json --parameter-json params/nft-params.json --schema dist/cis2-nft/schema.bin --grpc-ip node.testnet.concordium.com
