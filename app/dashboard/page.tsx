"use client";
import { useRole } from "@/hooks/role";
import DoctorPage from "./components/DoctorPage";

export default function DashboardPage() {
  const { role } = useRole();

  console.log(role);
    
  switch (role) {
    case "admin":
      return <div>Admin Page</div>;
    case "doctor-unapproved":
      return <div>Vui lòng đợi admin cấp quyền cho bạn</div>;
    case "doctor-approved":
      return <div><DoctorPage /></div>;
    default:
    case "public":
      return <div>Vui lòng kết nối ví để hiển thị màn hình quản lý</div>;
  }
}
