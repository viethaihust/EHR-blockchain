"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import HomeBanner from "./components/HomeBanner";
import Link from "next/link";

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
        <Link href="/testsc" className="ml-6">
          <Button>Test SC</Button>
        </Link>
      </div>
      <div>
        <HomeBanner></HomeBanner>
      </div>
    </div>
  );
}
