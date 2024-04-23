import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center bg-gray-100">
        <Link href="/patient">
          <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600">
            Patient
          </button>
        </Link>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-gray-200">
        <Link href="/connect-wallet">
          <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600">
            Doctor
          </button>
        </Link>
      </div>
    </div>
  );
}
