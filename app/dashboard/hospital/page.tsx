"use client";
import React from "react";
import { Table, Button, Space } from "antd";
import Link from "next/link";
import { PlusCircleOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

type DataType = {
  key: React.Key;
  hospitalName: string;
  address: string;
};

const data: DataType[] = [
  {
    key: "1",
    hospitalName: "Bệnh viện Việt Đức",
    address: "40 Phố Tràng Thi - Hoàn Kiếm - Hà Nội - Việt Nam",
  },
  {
    key: "2",
    hospitalName: "Bệnh viện Bạch Mai",
    address: "78 Đường Giải Phóng Phương Mai 11519 Hà Nội",
  },
];

export default function DashboardHospitalPage() {
  return (
    <div className="mt-4">
      <div className="mb-6 flex justify-end">
        <Link href="hospital/create">
          <Button className="!inline-flex items-center">
            <PlusCircleOutlined />
            Create Hospital
          </Button>
        </Link>
      </div>
      <Table dataSource={data} scroll={{ y: 600 }}>
        <Column title="Hospital Name" dataIndex="hospitalName" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <span>
              <Link href={`hospital/edit/${record.key}`}>
                <Button type="default" size="small">
                  Edit
                </Button>
              </Link>
              <Link href={`hospital/details/${record.key}`}>
                <Button type="default" size="small" style={{ marginLeft: 16 }}>
                  Details
                </Button>
              </Link>
            </span>
          )}
        />
      </Table>
    </div>
  );
}
