"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // if (userId === "") {
    router.push("/dashboard/campaign?tab=all_campaign");
    // }
  }, []);

  return <section className="w-full h-full bg-white"></section>;
};

export default Page;
