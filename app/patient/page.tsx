"use client";
import { Suspense } from "react";
import Search from "../components/Search";

export default function PatientPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
