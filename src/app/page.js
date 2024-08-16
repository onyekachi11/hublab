"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // if (userId === "") {
    router.push("/dashboard/campaign?tab=all_campaign");
    // }
  }, []);
  return <main>{/* <p>hello</p> */}</main>;
}
