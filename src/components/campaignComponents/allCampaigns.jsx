import Image from "next/image";
import { Button } from "@/components";
import { useWallet } from "@/context";
import {
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  ContractName,
  Energy,
  EntrypointName,
  ReceiveName,
  SchemaVersion,
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
import Info from "../../assets/info.png";
import { getChallenge, authorize } from "@/utils/backendUtils";
import { useSelector, useDispatch } from "react-redux";
import { root } from "@/store/store";
import { setAllCampaigns } from "@/store/slices/statesSlice";

const AllCampaign = () => {
  const [nftContract, setNftContract] = useState();
  const [nftSchema, setNftSchema] = useState();
  const [loadingContract, setLoadingContract] = useState();
  const [inputValues, setInputValues] = useState([]);
  const [inputValuesMap, setInputValuesMap] = useState({});
  const [authToken, setAuthToken] = useState("");
  const {
    connection,
    contract,
    moduleSchemaBase64Embedded,
    account,
    rpc,
    campaignsLoading,
    setCampaignsloading,
    // campaigns,
    fetchCampaign,
    allcamp,
  } = useWallet();
  const dispatch = useDispatch();

  // const allcamp = useSelector((state) => state.generalStates.allCampaigns);

  useEffect(() => {
    const initialValues = {};
    if (Array.isArray(allcamp)) {
      allcamp.forEach((item) => {
        if (
          item?.campaign?.tasks?.tasks &&
          Array.isArray(item.campaign.tasks.tasks)
        ) {
          initialValues[Number(item.campaign.id)] = new Array(
            item.campaign.tasks.tasks.length
          ).fill("");
        }
      });
    } else {
      console.warn("allcamp is not an array:", allcamp);
    }
    setInputValuesMap(initialValues);
  }, [allcamp]);

  useEffect(() => {
    const initializeNftContract = async () => {
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

    initializeNftContract();
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

  useEffect(() => {
    if (!account) {
      toast.info("Connect your wallet");
    }
  }, [account]);

  const completeCampaign = async (id) => {
    const params = {
      parameters: {
        id: id,
        answers: inputValuesMap[`${id}`],
      },
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };
    // Sign and send the transaction

    try {
      const transactionHash = await connection?.signAndSendTransaction(
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
      toast.success(`Campaign completed", ${transactionHash}`);
      const result = await fetchCampaign();
      dispatch(setAllCampaigns(result));
      return transactionHash;
    } catch (error) {
      console.error("Error completing campaign:", error);
      toast.error("Error completing campaign. Please try again.");
      throw error;
    }
  };

  const moduleNftSchemaBase64Embedded = btoa(
    new Uint8Array(nftSchema).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const completeMint = async (id) => {
    const params = {
      parameters: id,
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };
    // Sign and send the transaction

    try {
      const transactionHash = await connection?.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
          amount: CcdAmount.fromCcd(0),
          address: ContractAddress.create(contract.index, 0),
          receiveName: ReceiveName.create(
            contract.name,
            EntrypointName.fromString("complete_mint")
          ),
          maxContractExecutionEnergy: Energy.create(
            MAX_CONTRACT_EXECUTION_ENERGY
          ),
        },
        params
      );
      toast.success(`Mint Successful", ${transactionHash}`);
      const result = await fetchCampaign();
      dispatch(setAllCampaigns(result));
      return transactionHash;
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Error completing campaign. Please try again.");
      throw error;
    }
  };

  const mintNft = async (id) => {
    const params = {
      parameters: {
        owner: {
          Account: [account],
        },
        tokens: ["00000115"],
      },
      schema: moduleSchemaFromBase64(moduleNftSchemaBase64Embedded),
    };

    console.log(params);
    // Sign and send the transaction

    try {
      const transactionHash = await connection?.signAndSendTransaction(
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
      );
      await completeMint(id);
      return transactionHash;
    } catch (error) {
      console.error("Error completing campaign:", error);
      toast.error("Mint rejected");
      throw error;
    }
  };

  const authorizeCampaign = async (id) => {
    const params = {
      parameters: id,
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };

    try {
      const transactionHash = await connection?.signAndSendTransaction(
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

      toast.success(`Authorization Successful, ${transactionHash}`);
      await fetchCampaign();
      return transactionHash;
    } catch (error) {
      toast.error("Failed to authorize.");
      throw error;
    }
  };

  const handleAuthorize = useCallback(
    async (nationality, lower, upper, id) => {
      try {
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
          throw new Error("No account available");
        }

        const provider = await detectConcordiumProvider();
        const challenge = await getChallenge(VERIFIER_URL, account);
        const proof = await provider.requestIdProof(
          account,
          statement,
          challenge
        );

        const newAuthToken = await authorize(
          VERIFIER_URL,
          challenge,
          proof,
          statement
        );

        console.log(newAuthToken);

        if (newAuthToken) {
          await authorizeCampaign(id);
        } else {
          toast.error("Failed to get authorization token");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        toast.error("Authorization failed: " + error.message);
      }
    },
    [account, authorizeCampaign, fetchCampaign]
  );

  useEffect(() => {
    fetchCampaign();
  }, [account]);

  return (
    <div className="w-full p-3 my-4 rounded-lg">
      {account && allcamp && allcamp?.length > 0 ? (
        <section className="flex flex-col gap-4">
          {allcamp?.map((item, index) => {
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
                {item.authorized === true && (
                  <div>
                    <p className="font-semibol text-primary text-[20px] mb-1 mt-6">
                      Tasks
                    </p>
                    {item.campaign?.tasks?.tasks?.map((task, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex gap-1 mb-1">
                          <p>{index + 1}.</p>
                          <p>{task}</p>
                        </div>

                        {item.campaign?.tasks?.answers.length == 0 && (
                          <input
                            type="text"
                            className="border border-black outline-none bg-transparent px-2 py-2 rounded-md w-[40%]"
                            onChange={(e) => {
                              setInputValuesMap((prevMap) => {
                                const newArray = [
                                  ...(prevMap[item.campaign.id] || []),
                                ];
                                newArray[index] = e.target.value;
                                return {
                                  ...prevMap,
                                  [item.campaign.id]: newArray,
                                };
                              });
                            }}
                          />
                        )}
                      </div>
                    ))}
                    {item.campaign?.tasks?.answers.length > 0 && (
                      <div>
                        <p className="font-semibol text-primary text-[20px] mb-1 mt-6">
                          Answers
                        </p>
                        {item.campaign?.tasks?.answers.map((answer, index2) => (
                          <div key={index2}>
                            {answer[1].map((a, a_index) => (
                              <div key={a_index} className="flex gap-2">
                                <p>{a_index + 1}.</p>
                                <p>{a}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="w-[20px]">
                      <Image sizes="" src={Info} alt="Information" />
                    </div>
                    <p>
                      Only allowed to countries on this list:{" "}
                      {item.campaign?.nationality?.map((item, index) => (
                        <span key={index}>{item}, </span>
                      ))}
                    </p>
                  </div>
                  {item.completed === false ? (
                    item.authorized === true ? (
                      <p
                        className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                        onClick={() => {
                          console.log(inputValuesMap[`${item.campaign.id}`]);

                          const taskAnswers =
                            inputValuesMap[`${item.campaign.id}`] || [];
                          const allTasksAnswered =
                            taskAnswers.length ===
                              item.campaign.tasks.tasks.length &&
                            taskAnswers.every((answer) => answer.trim() !== "");

                          if (allTasksAnswered) {
                            completeCampaign(item.campaign.id);
                            // await fetchCampaign();
                          } else {
                            toast.info("Complete all answers");
                          }
                        }}
                      >
                        Complete campaign
                      </p>
                    ) : (
                      <p
                        className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                        // onClick={() => completeCampaign(item.campaign.id)}
                        onClick={async () => {
                          await handleAuthorize(
                            item.campaign.nationality,
                            item.campaign.age_range.lower,
                            item.campaign.age_range.upper,
                            item.campaign.id
                          );
                          await fetchCampaign();
                        }}
                      >
                        Participate
                      </p>
                    )
                  ) : (
                    <div className="flex gap-2">
                      {item.minted === false && (
                        <p
                          className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                          onClick={async () => {
                            await mintNft(item.campaign.id);
                            await fetchCampaign();
                          }}
                        >
                          Mint NFT
                        </p>
                      )}
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
          {campaignsLoading ? (
            <p>Loading campaigns.....</p>
          ) : (
            <>
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
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default AllCampaign;
