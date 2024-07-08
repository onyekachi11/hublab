"use client";
import React from "react";
import Details from "@/components/campaignComponents/details";
import Summary from "@/components/campaignComponents/summary";
import Start from "@/components/campaignComponents/start";
import { useSearchParams } from "next/navigation";

const page = ({ account }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const grit = searchParams.get("grit");
  return (
    <>
      <div>
        {tab === "start" && <Start />}
        {tab === "details" && <Details />}
        {tab === "summary" && <Summary />}
        {grit === "start" && <Finish />}
        {grit === "details" && <Fahgd />}
        {grit === "summary" && <Bgge />}
      </div>
    </>
  );
};

export default page;


// <section className="flex flex-col gap-3 items-center justify-center h-screen w-full">
//         <div className="border bg-white shadow-sm rounded-xl">
//           <Image
//             src={"/images/emptyStateImage.svg"}
//             height={300}
//             width={300}
//             alt="champ"
//             className="inline"
//           />
//         </div>

//         <p className="text-[#0D0E32] font-medium text-2xl">
//           Oops! No campaigns yet
//         </p>
//         <p className="text-[#0D0E32] font-normal text-sm">
//           No worries, you can do something about it
//         </p>

//         <Button href={"/cre"} className={"px-6"} name={"Create Campaign"} />
//       </section>