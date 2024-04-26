"use client";
import { Button, Table } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useGetPatients from "@/app/components/useGetPatients";
import { useState } from "react";

const columns = [
  {
    title: "Patient Id",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Height",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
  },
  {
    title: "Blood Pressure",
    dataIndex: "bloodPressure",
    key: "bloodPressure",
  },
  {
    title: "Covid Vaccinated",
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
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_: any, record: any) => (
      <span>
        <Link href={`patient/details/${record.patientId}`}>
          <Button type="default" size="small">
            Details
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
