"use client";
import CampaignPreview from "@/components/modals/campaignPreview";
import { useNav } from "@/context";
import { getCampaign } from "@/store/slices/campaignSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { setUserId } from "@/store/slices/statesSlice";
import LogoutButton from "@/components/logout";
import WalletLogin from "@/components/walletLogin";
import { useAccount } from "@particle-network/connect-react-ui";
import logo from "../../assets/Logo.svg";
import Image from 'next/image'

const page = () => {
  // const { singleCampaign, setSingleCampaign } = useNav();
  const [singleCampaign, setSingleCampaign] = useState({});

  const dispatch = useDispatch();
  const account = useAccount();


  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(id);
  console.log(singleCampaign);

  const getSingleCampaign = async () => {
    try {
      const response = await dispatch(getCampaign({ id: id }));
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        setSingleCampaign(response?.payload?.capmaign);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleCampaign();
  }, []);

  useEffect(() => {
    dispatch(setUserId(account));
  }, [account]);

  return (
    <div>
      <div className="bg-primary flex justify-between items-center px-5 py-3">
        <Image src={logo} alt="Verxio Logo" className="w-[50px]" />
        <div className="flex items-center gap-3">
          {/* <Button name="start earning" /> */}
          {account ? <LogoutButton /> : <WalletLogin />}
          {/* <WalletLogin/> */}
        </div>
      </div>
      <div className="h-full">
        {singleCampaign && Object.keys(singleCampaign).length !== 0 && (
          <CampaignPreview
            campaignId={id}
            reward={singleCampaign}
            totalReward={singleCampaign.totalRewardPoint}
          />
        )}
      </div>
    </div>
  );
};

export default page;
