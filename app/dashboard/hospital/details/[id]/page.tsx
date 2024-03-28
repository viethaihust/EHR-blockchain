import React from "react";
import { Table } from "antd";
export default function DetailsHospitalPage() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      email: "doctor@gmail",
      phoneNumber: "0999999999",
      specialty: "Cardiology",
    },
    {
      key: "2",
      name: "John",
      email: "doctor@gmail",
      phoneNumber: "0333333333",
      specialty: "Neurology",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl">Hospital Name</h1>
      <div className="mt-6 overflow-hidden">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-left text-xl leading-relaxed">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                Hospital ID
              </td>
              <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                HOSPITALID
              </td>
            </tr>
            <tr>
              <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                Hospital Name
              </td>
              <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                Bệnh viện Việt Đức
              </td>
            </tr>
            <tr>
              <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                Address
              </td>
              <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                40 Phố Tràng Thi - Hoàn Kiếm - Hà Nội - Việt Nam
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold leading-relaxed">Doctor List</h3>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}
