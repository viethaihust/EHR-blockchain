import React from "react";
import { Button } from "antd";
import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 w-full h-[4rem] bg-slate-100 flex items-center">
      <Link href="/">
        <Button type="primary" className="bg-slate-600 ml-20">
          Home
        </Button>
      </Link>
      <Link href="/admin/hospitals">
        <Button type="primary" className="bg-slate-600 ml-20">
          Admin
        </Button>
      </Link>
      <Button type="primary" className="bg-slate-600 ml-auto mr-20">
        Login
      </Button>
    </header>
  );
}
