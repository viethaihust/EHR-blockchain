"use client";
import { useAccount, useReadContract } from "wagmi";
import { patientListContract } from "@/smart-contracts/ExampleAbi";
import { Spin, Table } from "antd";

const columns = [
  {
    title: "Patient Address",
    dataIndex: "patientAddress",
    key: "patientAddress",
  },
  {
    title: "Doctor Address",
    dataIndex: "doctorAddress",
    key: "doctorAddress",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
  },
  {
    title: "Prescription",
    dataIndex: "prescription",
    key: "prescription",
  },
];

export default function ViewMedical() {
  const { address } = useAccount();
  const formattedAddress = address || `0x`;

  const { data: patientData } = useReadContract({
    ...patientListContract,
    functionName: "getPatientMedicalList",
    args: [formattedAddress],
  });

  const { data: visitHistory } = useReadContract({
    ...patientListContract,
    functionName: "getVisitHistoryList",
    args: [formattedAddress],
  });

  console.log(patientData);
  console.log(visitHistory);

  return (
    <div>
      <div className="px-20 py-10">
        <div className="overflow-hidden">
          <div className="mb-6 text-xl font-bold">Medical Details</div>
          {patientData ? (
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Name
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.name}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Weight
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.weight.toString() + " "}kg
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Height
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.height.toString() + " "}cm
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Blood Group
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.bloodGroup}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Blood Pressure
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.bloodPressure.toString() + " "}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Covid Vaccinated
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientData?.covidVaccine.toString()}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div>
              <Spin />
            </div>
          )}
          {visitHistory && (
            <div className="mt-10">
              <div className="mb-6 text-xl font-bold">Visit List History</div>
              <Table
                dataSource={visitHistory}
                columns={columns}
                rowKey={record => record.date}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
