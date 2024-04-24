"use client";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import { Button, Table } from "antd";
import Link from "next/link";
import { useReadContract } from "wagmi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

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
          <Button type="default" size="small" style={{ marginLeft: 16 }}>
            Details
          </Button>
        </Link>
      </span>
    ),
  },
];

export default function DashboardPatientPage() {
  const { data: patientLength } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatientsLength",
  });

  const { data: patients } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatients",
    args: [BigInt(0), patientLength ? patientLength - BigInt(1) : BigInt(0)],
  });

  const transformedArray = [];
  if (patients) {
    const length = patients[1].length;

    for (let i = 0; i < length; i++) {
      const newObj = {
        patientId: patients[1][i],
        name: patients[2][i],
        weight: patients[3][i].toString(),
        height: patients[4][i].toString(),
        bloodGroup: patients[5][i],
        bloodPressure: patients[6][i].toString(),
        covidVaccinated: patients[7][i],
      };
      transformedArray.push(newObj);
    }

    console.log(transformedArray);
  }

  return (
    <div className="p-4">
      {transformedArray && (
        <Table
          dataSource={transformedArray}
          columns={columns}
          rowKey={record => record.patientId}
        />
      )}
    </div>
  );
}
