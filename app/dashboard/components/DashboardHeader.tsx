"use client";
import { Button, Layout } from "antd";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <Header className="flex items-center justify-between border-b-2 !bg-white">
      <Button
        onClick={() => {
          router.push(`/`);
        }}
      >
        Home
      </Button>
    </Header>
  );
}
