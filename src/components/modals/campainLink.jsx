"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import Check from "../../assets/check-icon.svg";
import { CloseCircle } from "iconsax-react";

const CampaignLink = ({ setModalOpen, id, campaignId }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    const textToCopy = document.getElementById("text-to-copy").innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopySuccess(true);
      })
      .catch((err) => {
        setCopySuccess(false);
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-[#000]/40  absolute w-full h-screen overflow-hidden top-0 left-0 z-50 flex justify-center items-center px-28">
      <div className="bg-white p-5 rounded-lg">
        <div className="flex justify-end mb-2">
          <CloseCircle
            size={32}
            onClick={() => {
              setModalOpen(false);
              setCopySuccess(false);
            }}
            className="cursor-pointer w-7 sm:w-10"
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className=" text-[17px] sm:text-[25px] font-medium text-[#484851]">
            {/* Refer a friend and get 500 points */}
            Share campaign link
          </h2>
        </div>
        <p className="mb-8 text-[12px]">
          {/* Explore Verxio and earn daily with your friends. */}
        </p>
        <div className="bg-[#DFDFF7] p-5 rounded-md flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="p-2 rounded-lg bg-white text-[12px]" id="text-to-copy">
            {`http://www.verxio.xyz/campaign?id=${campaignId}`}
          </p>
          <div className="-top-3">
            <Button name="copy link" onClick={handleCopy} />
          </div>
        </div>
        {copySuccess && (
          <div className="flex items-center gap-2 mt-2 cursor-pointer">
            <Image alt="check icon" src={Check} />
            <p>Copied!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignLink;
