"use client";
import TabButton from "@/components/TabButton";
import { useSearchParams } from "next/navigation";
import Action from "@/components/campaignComponents/action";
import Details from "@/components/campaignComponents/details";
import Rewards from "@/components/campaignComponents/rewards";

const CreateCampaign = () => {
  const searchParams = useSearchParams();
  const route = searchParams.get("route") || "details";
  return (
    <>
      <div className="flex gap-10 items-center shadow-sm mb-3">
        <TabButton
          name="Details"
          href="/dashboard/campaign/create_campaign?route=details"
          isActive={route === "details"}
        />
        <TabButton
          name="Action"
          href="/dashboard/campaign/create_campaign?route=action"
          isActive={route === "action"}
        />
        <TabButton
          name="Rewards"
          href="/dashboard/campaign/create_campaign?route=rewards"
          isActive={route === "rewards"}
        />
      </div>

      {route === "details" && <Details />}
      {route === "action" && <Action />}
      {route === "rewards" && <Rewards />}
    </>
  );
};

export default CreateCampaign;
