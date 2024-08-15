import {
  BrowserWalletConnector,
  CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
  persistentConnectorType,
  WalletConnectConnector,
} from "@concordium/react-components";

export const DEFAULT_CONTRACT_INDEX = BigInt(9739);
export const DEFAULT_NFT_CONTRACT_INDEX = BigInt(9896);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
export const PING_INTERVAL_MS = 5000;
export const VERIFIER_URL = "https://hublab-2.onrender.com/api";
// export const VERIFIER_URL = "http://localhost:8100/api";

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

// cargo concordium build --schema-embed --out dist/cis2-nft/cis2.module.wasm.v1 --schema-out dist/cis2-nft/schema.bin

// concordium-client module deploy dist/cis2-nft/cis2.module.wasm.v1 --sender my_wallet.json --name food-nft5 --grpc-ip node.testnet.concordium.com

// concordium-client contract init food-nft5  --sender my_wallet.json --contract cis2_nft --name food-nft5 --energy 3000 --grpc-ip node.testnet.concordium.com

// concordium-client contract update food-nft5 --entrypoint mint --energy 3000 --sender my_wallet.json --parameter-json params/nft-params.json --schema dist/cis2-nft/schema.bin --grpc-ip node.testnet.concordium.com
