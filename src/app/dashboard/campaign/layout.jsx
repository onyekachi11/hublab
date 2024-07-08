"use client";
import { Button } from "@/components";
import { useSearchParams, permanentRedirect, redirect } from "next/navigation";
import { SearchNormal1, Notification } from "iconsax-react";
import TabButton from "@/components/TabButton";

const layout = ({ children }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  // const route = searchParams.get("route");

  return (
    <section className="">
      <div className="bg-white z-50 sticky top-0 flex items-center justify-between py-4 px-6">
        <div className="relative rounded-full h-50 border w-[450px]  border-[#AEAEB7]">
          <SearchNormal1
            className="absolute left-5 top-2"
            size="26"
            color="#484851"
          />
          <input
            type="text"
            className="h-full w-full border-inherit rounded-full outline-none bg-transparent pl-16 p-3 placeholder:font-normal placeholder:text-sm"
            placeholder="Search for something"
          />
        </div>

        <div className="flex items-center gap-8">
          <blockquote className="flex items-center space-x-3">
            <Notification size="26" color="#484851" />
            <p className="text-sm font-normal text-[#787887]">Notification</p>
          </blockquote>

          <Button name="Create Campaign" />
        </div>
      </div>

      <div className="flex gap-10 items-center justify-center">
        <TabButton
          name="Start"
          href="/dashboard/campaign?tab=start"
          isActive={tab === "start"}
        />
        <TabButton
          name="Details"
          href="/campaign?tab=details"
          isActive={tab === "details"}
        />
        <TabButton
          name="summary"
          href="/dashboard/campaign?tab=ongoing"
          isActive={tab === "ongoing"}
        />
      </div>
      {/* <div className="flex gap-10 items-center justify-center">
        <TabButton
          name="Acjsbdhtion"
          href="/createCampaign?route=action"
          isActive={route === 'action'}
        />
        <TabButton
          name="Rewhjdsard"
          href="/createCampaign?route=reward"
          isActive={route === 'reward'}
        />
        <TabButton
          name="Drhdsbkaft"
          href="/createCampaign?route=draft"
          isActive={route === 'draft'}
        />
      </div> */}

      <div>{children}</div>
    </section>
  );
};

export default layout;
