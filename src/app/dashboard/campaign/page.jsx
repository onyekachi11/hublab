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
  // const [campaigns, setCampaigns] = useState();
  const searchParams = useSearchParams();
  const { rpc, account, contract, fetchCampaign } = useWallet();

  const tab = searchParams.get("tab") || "start";

  const router = useRouter();

  console.log(contract);

  useEffect(() => {
    router.push(`/dashboard/campaign?tab=all_campaign`);
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (rpc && account && contract) {
        try {
          await fetchCampaign();
          // setCampaigns(campaigns);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          // Optionally, set an error state or show a user-friendly error message
        }
      }
    };

    fetchCampaigns();

    return () => {
      // cleanup if needed
    };
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

      {tab === "all_campaign" && <AllCampaign />}
      {/* {tab === "ongoing_campaign" && <OnGoingCampaign />}
      {tab === "draft" && <Details />} */}
    </>
  );
};

export default Campaign;
