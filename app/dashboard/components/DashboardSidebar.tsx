import {
  BankOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const sideItems: MenuProps["items"] = [
  {
    key: "/dashboard/doctor",
    label: <Link href="/dashboard/doctor">Doctor</Link>,
    icon: <SolutionOutlined />,
  },
  {
    key: "/dashboard/patient",
    label: <Link href="/dashboard/patient">Patient</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: "/dashboard/record",
    label: <Link href="/dashboard/record">Record</Link>,
    icon: <ReconciliationOutlined />,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sider
      width={200}
      className="bg-white p-2"
      style={{ backgroundColor: "white" }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        className="h-full !border-r-0"
        items={sideItems}
      />
    </Sider>
  );
}
