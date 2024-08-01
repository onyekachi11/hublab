"use client";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    // if (userId === "") {
    router.push("/dashboard/campaign?tab=all_campaign");
    // }
  }, []);

  return (
    // <section className="w-full h-full p-2 md:p-10">
    //   <section className="w-full border rounded-lg p-2 md:p-6 flex flex-col items-start gap-3">
    //     <h2 className="text-primary font-semibold text-[28px]">Dashboard</h2>

    //     <section className="flex items-start md:items-center gap-3 flex-wrap">
    //       <Link
    //         href={"/start_selling?tab=start"}
    //         className="border-dashed border-2 border-[#00ADEF] rounded-lg bg-[#E0F7FF] flex flex-col p-10 cursor-pointer items-center justify-center"
    //       >
    //         <Image
    //           src={"/images/createCampaign.svg"}
    //           height={50}
    //           width={50}
    //           alt={"add Button"}
    //         />
    //         <h3 className="text-[#424242] font-normal text-[14px]">
    //           Start Selling
    //         </h3>
    //       </Link>
    //       {transformedData.map((data, index) => (
    //         <DashboardCards key={index} {...data} {...colors[index]} />
    //       ))}
    //     </section>

    //     <CollectionTable userCollectionInfo={userCollectionInfo} />
    //     <CampaignTable userproductInfo={userproductInfo} />
    //   </section>
    // </section>
    <section className="w-full h-full bg-white"></section>
  );
};

export default Page;
