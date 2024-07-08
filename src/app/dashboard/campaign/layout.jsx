"use client";
import { Button } from "@/components";
import { useSearchParams, permanentRedirect, redirect } from "next/navigation";
import { SearchNormal1, Notification } from "iconsax-react";

const layout = ({ children }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
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
        <Button
          name="start"
          href="/campaign?tab=start"
          className={`${
            tab === "start" ? "bg-white text-primary" : "bg-transparent"
          } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "start" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
        <Button
          name="details"
          href="/campaign?tab=details"
          className={`${
            tab === "details"
              ? "bg-white text-primary"
              : "bg-transparent border-red-500"
          } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "inputs" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
        <Button
          name="Summary"
          href="/campaign?tab=summary"
          className={`${
            tab === "summary"
              ? "bg-white text-primary"
              : "bg-transparent border-red-500"
          }  py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "rewards" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
      </div>
      <div className="flex gap-10 items-center justify-center">
        <Button
          name="start"
          href="/createCampaign?tab=action"
          className={`${
            tab === "start" ? "bg-white text-primary" : "bg-transparent"
          } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "start" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
        <Button
          name="details"
          href="/createCampaign?tab=reward"
          className={`${
            tab === "details"
              ? "bg-white text-primary"
              : "bg-transparent border-red-500"
          } px-8 py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "inputs" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
        <Button
          name="Summary"
          href="/createCampaign?tab=preview"
          className={`${
            tab === "summary"
              ? "bg-white text-primary"
              : "bg-transparent border-red-500"
          }  py-1 border border-white rounded-[10px] text-[24px]`}
          shade={
            tab === "rewards" &&
            "left-[4px] bg-[#0D0E32] border-none rounded-[10px]"
          }
        />
      </div>

      <div>{children}</div>
    </section>
  );
};

export default layout;
