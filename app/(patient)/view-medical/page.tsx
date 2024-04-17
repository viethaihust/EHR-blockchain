"use client";
import { useAccount, useReadContract } from "wagmi";
import { patientListContract } from "@/smart-contracts/ExampleAbi";
import { Table } from "antd";

const columns = [
  {
    title: 'Patient Address',
    dataIndex: 'patientAddress',
    key: 'patientAddress',
  },
  {
    title: 'Doctor Address',
    dataIndex: 'doctorAddress',
    key: 'doctorAddress',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Diagnosis',
    dataIndex: 'diagnosis',
    key: 'diagnosis',
  },
  {
    title: 'Prescription',
    dataIndex: 'prescription',
    key: 'prescription',
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
      {patientData && (
        <div className="ml-20 mt-10">
          <div className="mt-6 overflow-hidden">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="text-left text-xl leading-relaxed">
                    Medical Details
                  </th>
                </tr>
              </thead>
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
          </div>
        </div>
      )}
      {visitHistory && (
        <div className="p-10">
          <div className="font-bold mb-10">Visit List History</div>
          <Table dataSource={visitHistory} columns={columns} />
        </div>
      )}
    </div>
  );
}
