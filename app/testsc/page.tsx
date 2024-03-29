"use client";
import React from "react";
import { useReadContract } from "wagmi";
import { Example_abi } from "@/smart-contracts/ExampleAbi";
import { Button, message } from "antd";
import { MintNFT } from "@/smart-contracts/mint-nft";

export default function Testsc() {
  const [messageApi, contextHolder] = message.useMessage();

  const result = useReadContract({
    abi: Example_abi,
    address: "0x4115a6b1121516679A670f861161918a3920e8e0",
    functionName: "number",
  });

  const handleClick = () => {
    messageApi.info(result.data?.toLocaleString());
  };

  return (
    <div className="p-10">
      <MintNFT></MintNFT>
      {contextHolder}
      <Button onClick={handleClick} className="mt-10">
        Read SC
      </Button>
    </div>
  );
}
