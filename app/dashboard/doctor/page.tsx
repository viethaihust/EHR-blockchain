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
  const { data: doctorLength } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctorsLength",
  });

  const { data: doctors } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctors",
    args: [BigInt(0), doctorLength ? doctorLength - BigInt(1) : BigInt(0)],
  });

  const transformedArray = [];
  if (doctors) {
    const length = doctors[1].length;

    for (let i = 0; i < length; i++) {
      const newObj = {
        etherAddress: doctors[1][i],
        name: doctors[2][i],
        specialty: doctors[3][i],
        isApproved: doctors[4][i],
      };
      transformedArray.push(newObj);
    }

    console.log(transformedArray);
  }

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
      {transformedArray && (
        <Table
          dataSource={transformedArray}
          columns={columns}
          rowKey={record => record.etherAddress}
        />
      )}
    </div>
  );
}
