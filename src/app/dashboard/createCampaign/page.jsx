"use client";
import { useSearchParams, permanentRedirect, redirect } from "next/navigation";

const Campaign = () => {
  const searchParams = useSearchParams();
  const route = searchParams.get("route");

  return (
    <>
      {route === "action" && <Action />}
      {route === "reward" && <Reward />}
      {route === "preview" && <Preview />}
    </>
  );
};

export default Campaign;
