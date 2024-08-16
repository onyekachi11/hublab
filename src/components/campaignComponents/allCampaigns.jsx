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
} from "@concordium/web-sdk";
import { MAX_CONTRACT_EXECUTION_ENERGY } from "@/config";
import { moduleSchemaFromBase64 } from "@concordium/react-components";
import { DEFAULT_NFT_CONTRACT_INDEX, VERIFIER_URL } from "@/config";
import empty from "../../assets/emptyStateImage.svg";

import { initContract } from "@/utils/initCotract";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import Info from "../../assets/info.png";
import { getChallenge, authorize } from "@/utils/backendUtils";
import { useSelector, useDispatch } from "react-redux";
import { setAllCampaigns } from "@/store/slices/statesSlice";
import { CloseCircle } from "iconsax-react";

const AllCampaign = () => {
  const [nftContract, setNftContract] = useState();
  const [nftSchema, setNftSchema] = useState();
  const [loadingContract, setLoadingContract] = useState();
  const [inputValues, setInputValues] = useState([]);
  const [inputValuesMap, setInputValuesMap] = useState({});
  const [authToken, setAuthToken] = useState("");
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingNft, setLoadingNft] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [campaignsLoading, setCampaignsloading] = useState(false);

  const {
    connection,
    contract,
    moduleSchemaBase64Embedded,
    account,
    rpc,
    fetchCampaign,
  } = useWallet();
  const dispatch = useDispatch();

  const allCamp = useSelector((state) => state.generalStates.allCampaigns);

  function getAnswersForAddress(answers, addressToCheck) {
    if (Array.isArray(answers)) {
      for (const answerSet of answers) {
        if (Array.isArray(answerSet) && answerSet.length === 2) {
          const [accountObj, answerArray] = answerSet;
          if (
            accountObj.Account &&
            Array.isArray(accountObj.Account) &&
            accountObj.Account.includes(addressToCheck)
          ) {
            return answerArray;
          }
        }
      }
    }
    return null;
  }

  useEffect(() => {
    const initialValues = {};
    if (Array.isArray(allCamp)) {
      allCamp.forEach((item) => {
        if (
          item.campaign?.tasks?.tasks &&
          Array.isArray(item.campaign.tasks.tasks)
        ) {
          initialValues[Number(item.campaign.id)] = new Array(
            item.campaign.tasks.tasks.length
          ).fill("");
        }
      });
    } else {
      console.warn("allCamp is not an array:", allCamp);
    }
    setInputValuesMap(initialValues);
  }, [allCamp]);

  useEffect(() => {
    setLoadingNft(true);
    const initializeNftContract = async () => {
      if (rpc) {
        try {
          const contractInstance = await initContract(
            rpc,
            DEFAULT_NFT_CONTRACT_INDEX
          );
          setNftContract(contractInstance);
          console.log("Nft contract fetched");
          setLoadingNft(false);
        } catch (error) {
          setLoadingNft(false);
          toast.error("Error initializing Nft contract", error);
          console.error("Error initializing Nft contract:", error);
        }
      }
    };

    initializeNftContract();
  }, [rpc]);

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

  const handleFetchCampaign = async (id) => {
    setTimeout(async () => {
      const result = await fetchCampaign();
      dispatch(setAllCampaigns(result));
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 11000);
  };

  const completeCampaign = async (id) => {
    const params = {
      parameters: {
        id: id,
        answers: inputValuesMap[`${id}`],
      },
      schema: moduleSchemaFromBase64(moduleSchemaBase64Embedded),
    };
    // Sign and send the transaction

    setLoadingStates((prev) => ({
      ...prev,
      [id]: true,
    }));
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
      await handleFetchCampaign(id);
      return transactionHash;
    } catch (error) {
      console.error("Error completing campaign:", error);
      toast.error("Error completing campaign. Please try again.");
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
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
      setShowModal(true);
      await handleFetchCampaign(id);

      return transactionHash;
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Error completing campaign. Please try again.");
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
      throw error;
    }
  };

  const mintNft = async (id) => {
    function generateRandomTokenId() {
      return Math.floor(10000000 + Math.random() * 90000000);
    }

    const randomTokenId = generateRandomTokenId();

    const params = {
      parameters: {
        owner: {
          Account: [account],
        },
        tokens: [randomTokenId.toString()],
      },
      schema: moduleSchemaFromBase64(moduleNftSchemaBase64Embedded),
    };

    // Sign and send the transaction

    setLoadingStates((prev) => ({
      ...prev,
      [id]: true,
    }));

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
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
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
      // transactionHash && (await handleFetchCampaign(id));
      // setTimeout(async () => {
      await handleFetchCampaign(id);
      // }, 5000);
      return transactionHash;
    } catch (error) {
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
      toast.error("Failed to authorize.");
      throw error;
    }
  };

  const handleAuthorize = useCallback(
    async (nationality, lower, upper, id) => {
      // setLoading(true);
      setLoadingStates((prev) => ({
        ...prev,
        [id]: true,
      }));
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

        if (newAuthToken) {
          await authorizeCampaign(id);
        } else {
          toast.error("Failed to get authorization token");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        setLoadingStates((prev) => ({
          ...prev,
          [id]: false,
        }));
        toast.error("Authorization failed: " + error.message);
      }
    },
    [account]
  );

  useEffect(() => {
    setCampaignsloading(true);
    fetchCampaign();
    setCampaignsloading(false);
  }, [contract, nftContract, account]);

  if (loadingNft) {
    return null;
  } else if (!contract && !nftContract) {
    return (
      <div className="text-center mt-10 text-[17px] font-normal flex justify-center gap-2">
        <CloseCircle className="text-red-500" />
        <p>failed to get contracts, please refresh...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-3 my-4 rounded-lg">
      {account && allCamp && allCamp?.length > 0 ? (
        <section className="flex flex-col gap-4 relativ">
          {[...allCamp]?.reverse().map((item, index) => {
            return (
              <div
                key={index}
                className="border border-primary rounded-lg p-3 cursor-pointer w-[100%] flex gap-3 flex-col"
              >
                <div className=" flex justify-between ">
                  <div className="w-[70%]">
                    <h2 className="capitalize text-primary text-2xl mb-3 ">
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

                        {item.completed === false && (
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
                    {item.completed === true && (
                      <div>
                        <p className="font-semibol text-primary text-[20px] mb-1 mt-6">
                          Answers
                        </p>
                        {item.campaign?.tasks?.answers ? (
                          (() => {
                            const userAnswers = getAnswersForAddress(
                              item.campaign.tasks.answers,
                              account
                            );
                            return userAnswers ? (
                              userAnswers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="flex gap-2">
                                  <p>{answerIndex + 1}.</p>
                                  <p>{answer}</p>
                                </div>
                              ))
                            ) : (
                              <p>
                                No answers found for this address in this
                                campaign
                              </p>
                            );
                          })()
                        ) : (
                          <p>No answers available for this campaign</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center gap-6">
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
                      <Button
                        // isLoading={loading}
                        isLoading={loadingStates[item.campaign.id] || false}
                        type="button"
                        name="Complete campaign"
                        onClick={() => {
                          const taskAnswers =
                            inputValuesMap[`${item.campaign.id}`] || [];
                          const allTasksAnswered =
                            taskAnswers.length ===
                              item.campaign.tasks.tasks.length &&
                            taskAnswers.every((answer) => answer.trim() !== "");

                          if (allTasksAnswered) {
                            completeCampaign(item.campaign.id);
                          } else {
                            toast.info("Complete all answers");
                          }
                        }}
                      />
                    ) : (
                      <Button
                        name="Participate"
                        type="button"
                        isLoading={loadingStates[item.campaign.id] || false}
                        onClick={async () => {
                          await handleAuthorize(
                            item.campaign.nationality,
                            item.campaign.age_range.lower,
                            item.campaign.age_range.upper,
                            item.campaign.id
                          );
                          // await fetchCampaign();
                        }}
                      />
                    )
                  ) : (
                    <div className="flex gap-2 items-center">
                      {item.minted === false && (
                        <Button
                          name="Mint Nft"
                          isLoading={loadingStates[item.campaign.id] || false}
                          // className="border border-lightBlue px-2 py-2 text-lightBlue rounded-md"
                          onClick={async () => {
                            await mintNft(item.campaign.id);
                            // await fetchCampaign();
                          }}
                        />
                      )}
                      <p className="border border-gray-400 px-2 py-1 text-gray-400 rounded-md">
                        Completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {showModal && (
            <div className="border border-black absolute top-0 left-0 text-primary z-50 bg-black/50 w-full h-full flex justify-center items-center">
              <div className=" bg-white px-10 py-10 rounded-sm ">
                <div className="float-right mb-5">
                  <CloseCircle size={30} onClick={() => setShowModal(false)} />
                </div>
                <div className="flex items-center flex-col gap-3 clear-both">
                  <p>
                    Import NFT with this contract index in your concordium
                    wallet:
                  </p>
                  <p className="border border-lightBlue px-7 py-3 rounded-md">
                    {Number(DEFAULT_NFT_CONTRACT_INDEX)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="flex flex-col gap-3 items-center justify-center h-full w-full mt-8">
          {campaignsLoading ? (
            <p>Loading campaigns.....</p>
          ) : (
            <>
              <div className="border bg-white shadow-sm rounded-xl">
                <Image
                  src={empty}
                  // height={300}
                  // width={300}
                  alt="empty data"
                  className="inline"
                />
              </div>

              {account ? (
                <>
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
              ) : (
                <p>Pls connect your wallet</p>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default AllCampaign;
