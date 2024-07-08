import React from "react";
import Image from "next/image";
import VerxioGold from "../../assets/VerxioCoin.svg";
import Check from "../../assets/check-icon.svg";
import Link from "next/link";

const SocialTask = ({ question, point, href, onClick, taskDone }) => {
  const linkHref = href || "";
  return (
    <div className="relative mb-3">
      <div className="flex justify-between items-center px-2 py-1 border border-primary rounded bg-white relative z-50 ">
        {href ? (
          <Link
            href={linkHref}
            target="_blank"
            className="font-medium text-[18px] w-[80%]"
            onClick={onClick}
          >
            {question}
          </Link>
        ) : (
          <div className="font-medium text-[18px]">{question}</div>
        )}
        {taskDone ? (
          <Image alt="check icon" src={Check} />
        ) : (
          <p className="flex items-center border rounded p-1 ">
            <Image alt="coin" src={VerxioGold} className="w-[23px] top-4" />
            <span className="ml-1 mr-[2px]">{point}</span>points
          </p>
        )}
      </div>
      <div className="rounded border bg-[#484851] h-full absolute w-full top-[5px] left-[5px] "></div>
    </div>
  );
};

export default SocialTask;
