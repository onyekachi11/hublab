import Image from "next/image";
import { Button } from "@/components";

const AllCampaign = () => (
  <div className="w-full p-3 my-4 rounded-lg">
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
  </div>
);

export default AllCampaign;
