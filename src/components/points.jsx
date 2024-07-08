import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import VerxioCoinBadge from "../assets/VerxioCoin.svg";
import getBalance from '@/utils/getVerxioBalance';
import { useSelector } from "react-redux";

const Points = ({balance2}) => {

  const userId = useSelector((state) => state.generalStates.userId);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (userId !== undefined) {
      getBalance(userId)
        .then(newBalance => setBalance(newBalance))
        .catch(error => console.error("Error fetching balance:", error));
    }
    
  }, [userId]); 

  
  return (
    <div>
      <h2 className="text-[20px] md:text-[28px] font-semibold text-[#0D0E32] mb-3">Points</h2>
      <div className="bg-[#ADEF00] p-5 rounded-2xl border border-[#486006] shadow-xl">
        <p className="text-[20px] font-medium mb-3">Balance</p>
        <div className="flex gap-2 xl:gap-4 items-center border rounded-xl px-4 xl:px-9 py- border-[#486006]">
          <Image alt="Verxio Point Icon" src={VerxioCoinBadge} className="w-10 mt-1" />
          <p className="font-semibold text-[20px] xl:text-[30px]">
          {balance !== null ? balance.toLocaleString() : 0}
            </p>
        </div>
        <div className="flex justify-end mt-3 lg:mt-4">
          <p className="text-[13px]">
            Today's Earnings:{" "}
            <span className="font-semibold text-[15px]">0</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Points