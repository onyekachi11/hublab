import Image from "next/image";
import React from "react";
import XLogo from "../assets/X-logo.svg";

const Socials = ({ name, logo, setFieldValue, value, userProfile }) => {
  return (
    <div className="border rounded-lg flex mb-3 border-[#222482] shadow-sm hover:scale-[1.02] hover:shadow-md">
      <div className="w-[20%] sm:w-[30%] border-r flex justify-cente items-center px-3 py-2 gap-2">
        <Image src={logo} alt="X logo" className="w-4 sm:w-5" />
        <p className="text-[13px] sm:text-[14px] hidden md:block">{name}</p>
      </div>
      <input
        placeholder={`enter your ${name} link`}
        defaultValue={userProfile && userProfile?.socials && userProfile?.socials[name] || ""}
        className="w-[70%] bg-transparent outline-none px-3"
        onChange={(e) => {
          setFieldValue(value, e.target.value);
        }}
      />
      {/* <p className="w-[70%] flex items-center justify-center">
        https://twitter.com/kirachienioluwa

      </p> */}
    </div>
  );
};

export default Socials;
