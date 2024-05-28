import { useRole } from "@/hooks/role";
import {
  SearchOutlined,
  SolutionOutlined,
  TeamOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const { Sider } = Layout;

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const sideItems: MenuProps["items"] = useMemo(
    () =>
      [
        {
          key: "/dashboard",
          label: <Link href="/dashboard">Tìm kiếm</Link>,
          icon: <SearchOutlined />,
          roles: ["doctor-approved"],
        },
        {
          key: "/dashboard/doctor",
          label: <Link href="/dashboard/doctor">Bác sĩ</Link>,
          icon: <SolutionOutlined />,
          roles: ["admin"],
        },
        {
          key: "/dashboard/patient",
          label: <Link href="/dashboard/patient">Bệnh nhân</Link>,
          icon: <TeamOutlined />,
          roles: ["admin", "doctor-approved"],
        },
      ].filter(item => item.roles.includes(role)),
    [role],
  );

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
