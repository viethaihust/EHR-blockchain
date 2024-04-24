"use client";
import { Button, Input, Table } from "antd";
import useGetPatients from "../components/useGetPatients";
import Link from "next/link";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export default function DoctorPage() {
  const dataSource = useGetPatients();
  const [searchedText, setSearchedText] = useState<any>("");

  const columns = [
    {
      title: "Patient Id",
      dataIndex: "patientId",
      key: "patientId",
      filteredValue: [searchedText],
      onFilter: (value: any, record: any) => {
        return (
          String(record.patientId)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
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
          <Link href={`doctor/details/${record.patientId}`}>
            <Button type="default" size="small">
              Details
            </Button>
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div className="m-40 p-16">
      {dataSource && (
        <div>
          <div className="flex justify-between">
            <div></div>
            <Input.Search
              placeholder="Search here..."
              style={{ marginBottom: 20, marginLeft: 50, width: "18rem" }}
              onSearch={value => {
                setSearchedText(value);
              }}
              onChange={e => {
                setSearchedText(e.target.value);
              }}
            />
            <Link href="doctor/create">
              <Button className="!inline-flex items-center">
                <PlusCircleOutlined />
                Create Patient
              </Button>
            </Link>
          </div>

          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.patientId}
          />
        </div>
      )}
    </div>
  );
}
