"use client";
import Action from "@/components/campaignComponents/action";
import Draft from "@/components/campaignComponents/draft";
import Reward from "@/components/campaignComponents/rewards";
import { useSearchParams } from "next/navigation";

const CreateCampaign = () => {
  const searchParams = useSearchParams();
  const route = searchParams.get("route") || "action";

  const components = {
    action: <Action />,
    reward: <Reward />,
    draft: <Draft />,
  };

  return components[route] || <Action />;
};

export default CreateCampaign;
