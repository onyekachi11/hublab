import Image from "next/image";
import { Button } from "@/components";
import { useWallet } from "@/context";
import {
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  Energy,
  EntrypointName,
  ReceiveName,
  statementAttributeTypeToAttributeType,
} from "@concordium/web-sdk";
import { MAX_CONTRACT_EXECUTION_ENERGY } from "@/config";
import { moduleSchemaFromBase64 } from "@concordium/react-components";
import { DEFAULT_NFT_CONTRACT_INDEX, VERIFIER_URL } from "@/config";

import { initContract } from "@/utils/initCotract";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import { getChallenge, authorize } from "@/utils/backendUtils";

const AllCampaign = ({ campaigns }) => {
  const [nftContract, setNftContract] = useState();
  const [nftSchema, setNftSchema] = useState();
  const [authToken, setAuthToken] = useState("");
  const { connection, contract, moduleSchemaBase64Embedded, account, rpc } =
    useWallet();

  useEffect(() => {
    const initializeContract = async () => {
      if (rpc) {
        try {
          const contractInstance = await initContract(
            rpc,
            DEFAULT_NFT_CONTRACT_INDEX
          );
          setNftContract(contractInstance);
        } catch (error) {
          toast.error("error initializing contract", error);
          console.error("Error initializing contract:", error);
        }
      }
    };

    initializeContract();
  }, [rpc]);

  // console.log(nftContract);

  useEffect(() => {
    const getSchema = async () => {
      if (rpc && nftContract) {
        try {
          // Get the embedded schema from the contract's source module
          const schema = await getEmbeddedSchema(
            rpc,
            nftContract?.sourceModule
          );
          setNftSchema(schema);
        } catch (error) {
          toast.error(error);
          console.error("Error initializing contract:", error);
        }
      }
    };

    getSchema();
  }, [rpc, nftContract]);

  // console.log(nftSchema);

  const completeCampaign = (id) => {
    const params = {
      parameters: id,
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };
    // Sign and send the transaction
    return connection?.signAndSendTransaction(
      account,
      AccountTransactionType.Update,
      {
        amount: CcdAmount.fromCcd(0),
        address: ContractAddress.create(contract.index, 0),
        receiveName: ReceiveName.create(
          contract.name,
          EntrypointName.fromString("complete_campaign")
        ),
        maxContractExecutionEnergy: Energy.create(
          MAX_CONTRACT_EXECUTION_ENERGY
        ),
      },
      params
    );
  };
  const authorizeCampaign = (id) => {
    const params = {
      parameters: id,
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };
    // Sign and send the transaction
    return connection?.signAndSendTransaction(
      account,
      AccountTransactionType.Update,
      {
        amount: CcdAmount.fromCcd(0),
        address: ContractAddress.create(contract.index, 0),
        receiveName: ReceiveName.create(
          contract.name,
          EntrypointName.fromString("authorize_campaign")
        ),
        maxContractExecutionEnergy: Energy.create(
          MAX_CONTRACT_EXECUTION_ENERGY
        ),
      },
      params
    );
  };

  const moduleNftSchemaBase64Embedded = btoa(
    new Uint8Array(nftSchema).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  console.log(account);

  const mintNft = () => {
    const params = {
      parameters: {
        owner: {
          Account: [account],
        },
        tokens: ["00000114"],
      },
      schema: moduleSchemaFromBase64(moduleNftSchemaBase64Embedded),
    };

    console.log(params);
    // Sign and send the transaction
    return connection
      ?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(0),
          address: ContractAddress.create(nftContract.index, 0),
          receiveName: ReceiveName.create(
            nftContract.name,
            EntrypointName.fromString("mint")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        },
        params
      )
      .then((transactionHash) => {
        console.log(
          "NFT minted successfully! Transaction hash:",
          transactionHash
        );
        toast.success(`Mint Successfull", ${transactionHash}`);
        return transactionHash;
      })
      .catch((error) => {
        console.error("Error minting NFT:", error);

        toast.error("Error minting NFT. Please try again.");
        throw error;
      });
  };

  const handleAuthorize = useCallback(
    async (nationality, lower, upper, id) => {
      const statement = [
        {
          type: "AttributeInSet",
          attributeTag: "nationality",
          set: nationality,
        },
        {
          type: "AttributeInRange",
          attributeTag: "dob",
          lower: lower,
          upper: upper,
        },
      ];
      if (!account) {
        throw new Error("Unreachable");
      }
      const provider = await detectConcordiumProvider();
      const challenge = await getChallenge(VERIFIER_URL, account);
      console.log(challenge);
      const proof = await provider.requestIdProof(
        account,
        statement,
        challenge
      );
      console.log(proof);

      const newAuthToken = await authorize(
        VERIFIER_URL,
        challenge,
        proof,
        statement
      );
      // setAuthToken(newAuthToken);
      // console.log(newAuthToken);

      newAuthToken && authorizeCampaign(id);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [account]
  );

  // console.log(authToken);

  return (
    <div className="w-full p-3 my-4 rounded-lg">
      {campaigns && campaigns.length > 0 ? (
        <section className="flex flex-col gap-4">
          {campaigns?.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-primary rounded-lg p-3 cursor-pointer w-[100%] flex gap-3 flex-col"
              >
                <div className=" flex justify-between">
                  <div>
                    <h2 className="capitalize text-primary text-2xl ">
                      {item.campaign?.title}
                    </h2>
                    <p>{item.campaign?.description}</p>
                  </div>
                  <p>
                    Total participants: {Number(item.campaign?.participants)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Only allowed to countries on this list:{" "}
                    {item.campaign?.nationality?.map((item, index) => (
                      <span key={index}>{item}, </span>
                    ))}
                  </p>
                  {item.completed === false ? (
                    item.authorized === true ? (
                      <p
                        className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                        onClick={() => completeCampaign(item.campaign.id)}
                      >
                        Participate
                      </p>
                    ) : (
                      <p
                        className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                        // onClick={() => completeCampaign(item.campaign.id)}
                        onClick={() =>
                          handleAuthorize(
                            item.campaign.nationality,
                            item.campaign.age_range.lower,
                            item.campaign.age_range.upper,
                            item.campaign.id
                          ).catch((e) => alert(e.message))
                        }
                      >
                        Authorize
                      </p>
                    )
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                        onClick={() => mintNft()}
                      >
                        Mint NFT
                      </button>
                      <p className="border border-gray-400 px-2 py-2 text-gray-400 rounded-md">
                        Completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="flex flex-col gap-3 items-center justify-center h-full w-full mt-8">
          <div className="border bg-white shadow-sm rounded-xl">
            <Image
              src={"/images/emptyStateImage.svg"}
              height={300}
              width={300}
              alt="champ"
              className="inline"
            />
          </div>

          <p className="text-[#0D0E32] font-medium text-2xl">
            Oops! No campaigns yet
          </p>
          <p className="text-[#0D0E32] font-normal text-sm">
            No worries, you can do something about it
          </p>

          <Button
            href={"/dashboard/campaign/create_campaign?route=details"}
            className={"px-6"}
            name={"Create Campaign"}
          />
        </section>
      )}
    </div>
  );
};

export default AllCampaign;
