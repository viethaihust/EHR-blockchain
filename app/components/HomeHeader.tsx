import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import {
  DownOutlined,
  UserOutlined,
  FolderViewOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const patientItems: MenuProps["items"] = [
  {
    label: <Link href="view-medical">View Medical</Link>,
    key: "1",
    icon: <FolderViewOutlined />,
  },
  {
    label: <Link href="create-edit-medical">Create/Edit Medical</Link>,
    key: "2",
    icon: <EditOutlined />,
  },
  {
    label: <Link href="grant-access">Grant Access</Link>,
    key: "3",
    icon: <CheckOutlined />,
  },
  {
    label: <Link href="revoke-access">Revoke Access</Link>,
    key: "4",
    icon: <CloseOutlined />,
  },
];

const doctorItems: MenuProps["items"] = [
  {
    label: <Link href="create-edit-doctor">Create/Edit Doctor</Link>,
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: <Link href="search-patient">Search Patient</Link>,
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: <Link href="edit-patient">Edit Patient</Link>,
    key: "3",
    icon: <UserOutlined />,
  },
  {
    label: <Link href="create-visit-history">Create Visit History</Link>,
    key: "4",
    icon: <UserOutlined />,
  },
];

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <Link href="/" className="ml-6">
          <Button>Home</Button>
        </Link>
        <Link href="dashboard" className="ml-6">
          <Button>Open Dashboard</Button>
        </Link>
      </div>
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

        <Dropdown menu={{ items: patientItems }} trigger={["click"]}>
          <Button>
            <Space>
              Patient
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown menu={{ items: doctorItems }} trigger={["click"]}>
          <Button>
            <Space>
              Doctor
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <ConnectButton />
      </div>
    </div>
  );
}
