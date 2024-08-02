import { BROWSER_WALLET, DEFAULT_CONTRACT_INDEX } from "@/config";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";
import { initContract } from "@/utils/initCotract";
import {
  useConnect,
  useConnection,
  useGrpcClient,
} from "@concordium/react-components";
import {
  AccountAddress,
  ContractAddress,
  ContractName,
  deserializeReceiveReturnValue,
  EntrypointName,
  ReceiveName,
  SchemaVersion,
} from "@concordium/web-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllCampaigns } from "@/store/slices/statesSlice";
import { Buffer } from "buffer/";

const WalletContext = createContext();

export const WalletProvider = ({ children, walletProps }) => {
  const dispatch = useDispatch();

  const allcamp = useSelector((state) => state.generalStates.allCampaigns);

  const {
    setActiveConnectorType,
    activeConnector,
    connectedAccounts,
    genesisHashes,
    network,
  } = walletProps;

  const [contract, setContract] = useState(null);
  const [schema, setSchema] = useState(null);
  const [campaignsLoading, setCampaignsloading] = useState(false);

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

  async function fetchCampaign() {
    setCampaignsloading(true);
    try {
      const method =
        contract &&
        ReceiveName?.create(
          contract?.name,
          EntrypointName?.fromString("get_campaigns")
        );

      //invoke contract state
      const result = await rpc?.invokeContract({
        contract: contract && ContractAddress?.create(contract?.index, 0),
        method,
        invoker: account && AccountAddress?.fromJSON(account),
      });

      const buffer =
        contract && Buffer.from(result?.returnValue?.buffer)?.buffer;

      console.log(buffer);
      const contract_schema =
        rpc && (await getEmbeddedSchema(rpc, contract?.sourceModule));

      const names = contract && ContractName?.fromString("Campaign_contract");
      const entry = contract && EntrypointName?.fromString("get_campaigns");

      const values =
        contract &&
        deserializeReceiveReturnValue(
          buffer,
          contract_schema,
          names,
          entry,
          SchemaVersion?.V1
        );

      console.log(values);

      // Dispatch the action to update the Redux store
      dispatch(setAllCampaigns(values));

      // Force a re-render by updating a local state
      setCampaignsloading(false);

      // Return the values in case you need them
      return values;
    } catch (error) {
      console.error("Error fetching contract data:", error);
      setCampaignsloading(false);
      throw error;
    }
  }

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
        fetchCampaign,
        campaignsLoading,
        setCampaignsloading,
        allcamp,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
