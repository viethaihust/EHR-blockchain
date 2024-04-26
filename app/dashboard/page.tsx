"use client";
import { useRole } from "@/hooks/role";

export default function DashboardPage() {
  const { role } = useRole();

  console.log("DashboardPage");

  return <div>123123</div>;
}
