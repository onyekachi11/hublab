"use client";
import { useSearchParams } from "next/navigation";
import AllCampaign from "@/components/campaignComponents/allCampaigns";
import OnGoingCampaign from "@/components/campaignComponents/onGoingCampaign";
import Details from "@/components/campaignComponents/details";
import TabButton from "@/components/TabButton";

const Campaign = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "start";

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
