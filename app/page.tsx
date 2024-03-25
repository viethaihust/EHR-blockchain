"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Open Dashboard
      </Button>
    </div>
  );
}
