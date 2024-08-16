import React from "react";
import Image from "next/image";
import SignOut from "../assets/SignOut.svg";
import { useRouter } from "next/navigation";
import { useWallet } from "@/context";
import { persistor } from "@/store/store";

const LogoutButton = () => {
  const router = useRouter();

  const { connection, account } = useWallet();

  const handleLogout = async () => {
    persistor.purge();
    persistor.purge();
    router.push("/");

    return connection?.disconnect();
  };

  if (!account) return null;
  return (
    <div
      onClick={handleLogout}
      className="flex items-center justify-center w-[100%] gap-3 cursor-pointer"
    >
      <Image src={SignOut} alt="" />
      <p className="text-white">Logout</p>
    </div>
  );
};

export default LogoutButton;
