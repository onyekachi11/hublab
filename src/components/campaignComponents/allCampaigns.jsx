import Image from "next/image";
import { Button } from "@/components";
import { useConnection, useGrpcClient } from "@concordium/react-components";

const AllCampaign = ({ campaigns }) => {
  return (
    <div className="w-full p-3 my-4 rounded-lg">
      {campaigns && campaigns.length > 0 ? (
        <section>
          {campaigns?.map((campaign, index) => {
            return (
              <div
                key={index}
                className="border border-primary rounded-lg p-3 cursor-pointer w-[100%] flex gap-3 flex-col"
              >
                <div className=" flex justify-between">
                  <div>
                    <h2 className="capitalize text-primary text-2xl ">
                      {campaign?.title}
                    </h2>
                    <p>{campaign?.description}</p>
                  </div>
                  <p>Total participants: {Number(campaign?.participants)}</p>
                </div>
                <p>
                  Only allowed to countries not on this list:{" "}
                  {campaign?.nationality?.map((item, index) => (
                    <span key={index}>{item}, </span>
                  ))}
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="flex flex-col gap-3 items-center justify-center h-full w-full mt-8">
          <div className="border bg-white shadow-sm rounded-xl">
            <Image
              src={"/images/emptyStateImage.svg"}
              height={300}
              width={300}
              alt="champ"
              className="inline"
            />
          </div>

          <p className="text-[#0D0E32] font-medium text-2xl">
            Oops! No campaigns yet
          </p>
          <p className="text-[#0D0E32] font-normal text-sm">
            No worries, you can do something about it
          </p>

          <Button
            href={"/dashboard/campaign/create_campaign?route=details"}
            className={"px-6"}
            name={"Create Campaign"}
          />
        </section>
      )}
    </div>
  );
};

export default AllCampaign;
