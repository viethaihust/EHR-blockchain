"use client"
import { Button, Table } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import useGetPatients from "@/app/components/useGetPatients";

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
        ) : <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />}
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
  const dataSource = useGetPatients();

  return (
    <div className="p-4">
      {dataSource && (
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.patientId}
        />
      )}
    </div>
  );
}
