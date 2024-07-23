"use client";
import { TESTNET, WithWalletConnector } from "@concordium/react-components";
import React from "react";
import { BROWSER_WALLET } from "../config";

const ConnectWalletProvider = ({ children }) => {
  return (
    <WithWalletConnector
      network={TESTNET}
      setActiveConnectorType={BROWSER_WALLET}
    >
      {(props) => React.cloneElement(children, { ...props })}
      {/* {children} */}
    </WithWalletConnector>
  );
};

export default ConnectWalletProvider;
