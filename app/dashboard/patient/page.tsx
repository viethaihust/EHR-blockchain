"use client";
import { Button, Table } from "antd";
import Link from "next/link";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import useGetPatients from "@/app/components/useGetPatients";
import { useState } from "react";

const columns = [
  {
    title: "Id bệnh nhân",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cân nặng",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Chiều cao",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Nhóm máu",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
  },
  {
    title: "Huyết áp",
    dataIndex: "bloodPressure",
    key: "bloodPressure",
  },
  {
    title: "Đã tiêm vắc xin covid",
    dataIndex: "covidVaccinated",
    key: "covidVaccinated",
    render: (covidVaccinated: boolean) => (
      <span>
        {covidVaccinated ? (
          <CheckCircleOutlined style={{ fontSize: "20px", color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
        )}
      </span>
    ),
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => (
      <span>
        <Link href={`patient/details/${record.patientId}`}>
          <Button type="default" size="small">
            Xem chi tiết
          </Button>
        </Link>
      </span>
    ),
  },
];

export default function DashboardPatientPage() {
  const [pageSize, setPageSize] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);
  const { patients, total } = useGetPatients({ pageSize, pageNumber });

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-end">
        <Link href="patient/create">
          <Button className="!inline-flex items-center">
            <PlusCircleOutlined />
            Tạo bệnh nhân
          </Button>
        </Link>
      </div>
      <Table
        dataSource={patients}
        columns={columns}
        rowKey={record => record.patientId}
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
