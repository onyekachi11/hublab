"use client";
import { useSearchParams, permanentRedirect, redirect } from "next/navigation";

const Campaign = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      {tab === "start" && <Start />}
      {tab === "details" && <Details />}
      {tab === "summary" && <Summary />}
    </>
  );
};

export default Campaign;
