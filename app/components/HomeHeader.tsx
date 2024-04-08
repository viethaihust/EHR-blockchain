import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    label: <Link href="/view-medical">View Medical</Link>,
    key: "0",
  },
  {
    label: <Link href="/grant-access">Grant Access</Link>,
    key: "1",
  },
  {
    label: <Link href="/revoke-access">Revoke Access</Link>,
    key: "2",
  },
];

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between border-b-2 !bg-white p-4">
      <div>
        <Link href="/dashboard">
          <Button>Open Dashboard</Button>
        </Link>
      </div>
      <div className="flex flex-row items-center mr-10">
        <Dropdown menu={{ items }} trigger={["click"]} className="mr-10">
          <Button onClick={e => e.preventDefault()}>
            <Space>
              Patient
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <ConnectButton />
      </div>
    </div>
  );
}
