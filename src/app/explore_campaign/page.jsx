"use client";
import LogoutButton from "@/components/logout";
import WalletLogin from "@/components/walletLogin";
import { getUserCampaigns } from "@/store/slices/campaignSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import logo from "../../assets/Logo.svg";
import { useAccount } from "@particle-network/connect-react-ui";
import { setUserId } from "@/store/slices/statesSlice";
import { root } from "@/store/store";

const page = () => {
  const [campaign, setCampaign] = useState([]);

  const dispatch = useDispatch();
  const account = useAccount();

  const userId = useSelector((state) => state.generalStates.userId);

  console.log(account);

  useEffect(() => {
    dispatch(setUserId(account));
  }, [account]);

  useEffect(() => {
    getUsersCampaign();
  }, []);

  console.log(campaign);

  const getUsersCampaign = async () => {
    try {
      const response = await dispatch(
        getUserCampaigns({ id: userId || account })
      );
      if (response?.payload?.success === true) {
        setCampaign(response?.payload?.capmaign);
        toast.success(response?.payload?.message);
      } else if (userId === undefined ) {
        toast.info("Connect your wallet to access campaigns");
      } else {
        toast.error("Error:: failed to load");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="p-4 w-full">
        {campaign.map((item) => (
          <Link
            href={`/campaign?id=${item._id}`}
            className="border border-primary rounded-lg p-3 cursor-pointer w-screen"
            //   onClick={() => getSingleCampaign(item._id)}
          >
            <div className=" flex justify-between items-center">
              <h2 className="capitalize">Title: {item.title}</h2>
              <p>Total reward point: {item.totalRewardPoint}</p>
            </div>
            <p> Total Participants: {item.participants}</p>
            <div className="flex gap-1 items-center">
              <p>From: {item.startDate}</p>
              <p>-</p>
              <p>to: {item.endDate}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
