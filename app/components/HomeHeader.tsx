import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: <Link href="view-medical">View Medical</Link>,
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Edit Medical?",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Grant Access",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "Revoke Access",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
];

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="dashboard" className="ml-6">
        <Button>Open Dashboard</Button>
      </Link>
      <div className="mr-10 flex items-center gap-6">
        <div>
          <Link href="sign-up">
            <button className="border border-gray-400 bg-gray-100 px-4 py-1 font-semibold text-black transition-colors duration-300 hover:bg-gray-200">
              Sign Up
            </button>
          </Link>
          <Link href="sign-in">
            <button className="px-4 py-1 font-semibold text-black transition-colors duration-300 hover:text-gray-500">
              Sign In
            </button>
          </Link>
        </div>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button>
            <Space>
              Button
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <ConnectButton />
      </div>
    </div>
  );
}
