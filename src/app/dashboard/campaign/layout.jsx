"use client";
import { Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchNormal1, Notification } from "iconsax-react";

const layout = ({ children }) => {
  const router = useRouter();
  return (
    <section>
      <div className="bg-white z-50 sticky top-0 flex items-center justify-between px-8 py-3 mb-3">
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

          <Button
            name="Create Campaign"
            onClick={() => {
              router.push("/dashboard/campaign/create_campaign?route=details");
            }}
          />
        </div>
      </div>

      <div className="p-8">{children}</div>
    </section>
  );
};

export default layout;
