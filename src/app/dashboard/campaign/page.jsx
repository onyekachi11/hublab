"use client";
import { useSearchParams } from "next/navigation";
import AllCampaign from "@/components/campaignComponents/allCampaigns";
import OnGoingCampaign from "@/components/campaignComponents/onGoingCampaign";
import Details from "@/components/campaignComponents/details";

const Campaign = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "start";

  return (
    <>
      {tab === "start" && <AllCampaign />}
      {tab === "details" && <Details />}
      {tab === "ongoing" && <OnGoingCampaign />}
    </>
  );
};

export default Campaign;
