"use client";
import { Button, Layout } from "antd";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <Header className="flex justify-between items-center !bg-white border-b-2">
      <Button
        onClick={() => {
          router.push(`/`);
        }}
      >
        Home
      </Button>
      <Button
        onClick={() => {
          router.push(`/`);
        }}
      >
        Wallet Button
      </Button>
    </Header>
  );
}
