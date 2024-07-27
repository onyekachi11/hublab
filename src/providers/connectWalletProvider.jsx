"use client";
import { TESTNET, WithWalletConnector } from "@concordium/react-components";
import React from "react";
import { BROWSER_WALLET } from "../config";
import { WalletProvider } from "@/context/WalletContext";
const ConnectWalletProvider = ({ children }) => {
  return (
    <WithWalletConnector
      network={TESTNET}
      setActiveConnectorType={BROWSER_WALLET}
    >
      {(walletProps) => (
        <WalletProvider walletProps={walletProps}>{children}</WalletProvider>
      )}
    </WithWalletConnector>
  );
};

export default ConnectWalletProvider;
