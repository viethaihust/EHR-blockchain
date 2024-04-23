"use client";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletPage() {
  const { address } = useAccount();

  const { data: userStatus } = useReadContract({
    ...medicalRecordContract,
    functionName: "getRole",
    account: address,
  });

  useEffect(() => {
    if (address && userStatus === "admin") {
      redirect("/dashboard");

    }else if (address && userStatus === "unregistered") {
        redirect("/register"); 
    }
    else if (address && userStatus === "unapproved") {
      redirect("/unapproved");
    } else if (address && userStatus === "doctor") {
      redirect("/doctor");
    }
  }, [address, userStatus]);

  console.log(userStatus);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="-mt-24 mb-6 text-xl">
        Please connect your wallet before continue
      </div>
      <ConnectButton />
    </div>
  );
}
