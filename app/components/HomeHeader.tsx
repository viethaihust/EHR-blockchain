import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

export default function HomeHeader() {
  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard" className="ml-6">
        <Button>Open Dashboard</Button>
      </Link>
      <ConnectButton />
    </div>
  );
}
