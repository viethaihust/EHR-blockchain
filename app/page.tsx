"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import HomeBanner from "./components/HomeBanner";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div className="p-4">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Open Dashboard
        </Button>
      </div>
      <div>
        <HomeBanner></HomeBanner>
      </div>
    </div>
  );
}
