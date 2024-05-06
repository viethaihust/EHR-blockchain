"use client";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Button, Table } from "antd";
import Link from "next/link";
import { useReadContract } from "wagmi";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import useGetDoctors from "@/app/components/useGetDoctors";
import { useState } from "react";

const columns = [
  {
    title: "Ether Address",
    dataIndex: "etherAddress",
    key: "etherAddress",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Specialty",
    dataIndex: "specialty",
    key: "specialty",
  },
  {
    title: "Is Approved",
    dataIndex: "isApproved",
    key: "isApproved",
    render: (isApproved: boolean) => (
      <span>
        {isApproved ? (
          <CheckCircleOutlined style={{ fontSize: "20px", color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
        )}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => (
      <span>
        <Link href={`doctor/details/${record.etherAddress}`}>
          <Button type="default" size="small">
            Details
          </Button>
        </Link>
      </span>
    ),
  },
];

export default function DashboardDoctorPage() {
  const [pageSize, setPageSize] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const { doctors, total } = useGetDoctors({ pageSize, pageNumber });

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-end">
        <Link href="doctor/create">
          <Button className="!inline-flex items-center">
            <PlusCircleOutlined />
            Create Doctor
          </Button>
        </Link>
      </div>
        <Table
          dataSource={doctors}
          columns={columns}
          rowKey={record => record.etherAddress}
          pagination={{
            total,
            pageSize,
            defaultCurrent: pageNumber,
            onChange(page_, pageSize_) {
              setPageSize(pageSize_);
              setPageNumber(page_);
            },
          }}
        />
    </div>
  );
}
