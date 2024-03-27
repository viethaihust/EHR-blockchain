"use client";
import { Layout } from "antd";
import React from "react";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";

const { Content, Sider } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout className="h-svh">
      <DashboardHeader />
      <Layout className="!bg-white" style={{}}>
        <DashboardSidebar />
        <Layout className="p-3">
          <Content className="m-0 rounded-lg bg-white p-6">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
