import { BROWSER_WALLET, DEFAULT_CONTRACT_INDEX } from "@/config";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";
import { initContract } from "@/utils/initCotract";
import {
  useConnect,
  useConnection,
  useGrpcClient,
} from "@concordium/react-components";
import React, { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children, walletProps }) => {
  const {
    setActiveConnectorType,
    activeConnector,
    connectedAccounts,
    genesisHashes,
    network,
  } = walletProps;

  const [contract, setContract] = useState(null);
  const [schema, setSchema] = useState(null);

  const rpc = useGrpcClient(network);

  const { connection, setConnection, account } = useConnection(
    connectedAccounts,
    genesisHashes
  );

  const { connect, isConnecting } = useConnect(activeConnector, setConnection);

  useEffect(() => {
    setActiveConnectorType(BROWSER_WALLET);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeConnector) {
      // When changing connector, select the first of any existing connections.
      const cs = activeConnector.getConnections();
      if (cs.length) {
        setConnection(cs[0]);
      }
    }
    return () => setConnection(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConnector, setConnection]);

  useEffect(() => {
    const initializeContract = async () => {
      if (rpc) {
        try {
          const contractInstance = await initContract(
            rpc,
            DEFAULT_CONTRACT_INDEX
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      }
    };

    initializeContract();
  }, [rpc]);

  // Get the embedded schema from the contract's source module
  useEffect(() => {
    const getSchema = async () => {
      if (rpc && contract) {
        try {
          // Get the embedded schema from the contract's source module
          const schema = await getEmbeddedSchema(rpc, contract?.sourceModule);
          setSchema(schema);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      }
    };

    getSchema();
  }, [rpc, contract]);

  // Convert the schema to Base64
  const moduleSchemaBase64Embedded = btoa(
    new Uint8Array(schema).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return (
    <WalletContext.Provider
      value={{
        walletProps,
        rpc,
        connection,
        connect,
        isConnecting,
        account,
        contract,
        schema,
        moduleSchemaBase64Embedded,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
