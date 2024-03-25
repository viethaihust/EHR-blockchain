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
          <Content className="p-6 rounded-lg m-0 bg-white">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
