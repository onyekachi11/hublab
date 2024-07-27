"use client";
import { useSearchParams, useRouter } from "next/navigation";
import AllCampaign from "@/components/campaignComponents/allCampaigns";
import OnGoingCampaign from "@/components/campaignComponents/onGoingCampaign";
import Details from "@/components/campaignComponents/details";
import TabButton from "@/components/TabButton";
import { useEffect, useState } from "react";
import {
  TESTNET,
  useConnection,
  useGrpcClient,
} from "@concordium/react-components";
import {
  AccountAddress,
  AccountTransactionType,
  CcdAmount,
  ContractAddress,
  ContractName,
  Energy,
  EntrypointName,
  InitName,
  ReceiveName,
  SchemaVersion,
  deserializeReceiveReturnValue,
} from "@concordium/web-sdk";
import { useWallet } from "@/context/WalletContext";
import { DEFAULT_CONTRACT_INDEX } from "@/config";
import { getEmbeddedSchema } from "@/utils/getEmbededSchema";
import { initContract } from "@/utils/initCotract";

const Campaign = () => {
  const [schema, setSchema] = useState();
  const [campaigns, setCampaigns] = useState();
  const searchParams = useSearchParams();
  const { rpc, account, connection, contract } = useWallet();

  const tab = searchParams.get("tab") || "start";

  const router = useRouter();

  console.log(contract);

  useEffect(() => {
    router.push(`/dashboard/campaign?tab=all_campaign`);
  }, []);

  // async function initContract(rpc, index) {
  //   console.debug(`Refreshing info for contract ${index.toString()}`);
  //   const info = await rpc.getInstanceInfo(ContractAddress.create(index, 0));
  //   console.log(info);
  //   // setContract(info);
  //   if (!info) {
  //     throw new Error(`contract ${index} not found`);
  //   }

  //   const { version, name, owner, amount, methods, sourceModule } = info;
  //   const prefix = "init_";
  //   if (!InitName.toString(name).startsWith(prefix)) {
  //     throw new Error(`name "${name}" doesn't start with "init_"`);
  //   }
  //   return {
  //     version,
  //     index,
  //     name: ContractName.fromInitName(name),
  //     amount,
  //     owner,
  //     methods,
  //     sourceModule,
  //   };
  // }

  async function fetchContractData() {
    try {
      //initiate contract
      // const data = await initContract(rpc, DEFAULT_CONTRACT_INDEX);
      const { name, index, sourceModule } = contract;
      console.log(index);
      // setContract(data);
      const method = ReceiveName.create(
        name,
        EntrypointName.fromString("get_campaigns")
      );

      //innvoke contract state
      const result = await rpc?.invokeContract({
        contract: ContractAddress.create(index, 0),
        method,
        invoker: AccountAddress.fromJSON(account),
      });

      console.log(result);

      const buffer = Buffer.from(result.returnValue.buffer).buffer;
      const contract_schema = await getEmbeddedSchema(rpc, sourceModule);
      console.log("Module source:", contract_schema);

      // setSchema(contract_schema);

      const names = ContractName.fromString("Campaign_contract");
      const entry = EntrypointName.fromString("get_campaigns");

      const values = deserializeReceiveReturnValue(
        buffer,
        contract_schema,
        names,
        entry,
        SchemaVersion.V1
      );

      console.log(values);
      setCampaigns(values);

      // console.log("Mreturn value", values[0]?.Some[0]?.all_task);
      // setMyTodos(values[0]?.Some[0]?.all_task);
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  }

  useEffect(() => {
    if (rpc && account && contract) {
      fetchContractData();
    }

    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpc, account, contract]);

  return (
    <>
      <div className="flex gap-10 items-center shadow-sm mb-3">
        <TabButton
          name="All Campaign"
          href="/dashboard/campaign?tab=all_campaign"
          isActive={tab === "all_campaign"}
        />
        {/* <TabButton
          name="Ongoing"
          href="/dashboard/campaign?tab=ongoing_campaign"
          isActive={tab === "ongoing_campaign"}
        />
        <TabButton
          name="Draft"
          href="/dashboard/campaign?tab=draft"
          isActive={tab === "ongoing"}
        />
        <TabButton
          name="Closed"
          href="/dashboard/campaign?tab=closed"
          isActive={tab === "closed"}
        />
        <TabButton
          name="Deleted"
          href="/dashboard/campaign?tab=deleted"
          isActive={tab === "deleted"}
        /> */}
      </div>

      {tab === "all_campaign" && <AllCampaign campaigns={campaigns} />}
      {/* {tab === "ongoing_campaign" && <OnGoingCampaign />}
      {tab === "draft" && <Details />} */}
    </>
  );
};

export default Campaign;
