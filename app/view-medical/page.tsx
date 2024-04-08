"use client";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import HomeHeader from "../components/HomeHeader";
import { patientListContract } from "@/smart-contracts/ExampleAbi";

export default function ViewMedical() {
  const [patientMedicalData, setPatientData] = useState<any>(null);
  const { data: patientDetailData, isSuccess } = useReadContract({
    ...patientListContract,
    functionName: "viewMedical",
  });

  useEffect(() => {
    if (isSuccess) {
      setPatientData(patientDetailData);
    }
  }, [isSuccess, patientDetailData]);

  console.log(patientMedicalData);

  return (
    <div>
      <HomeHeader></HomeHeader>
      {patientMedicalData && (
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
                    Weight
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.weight}kg
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Height
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.height}cm
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Blood Group
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.bloodGroup}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Disease Name
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.diseaseName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Disease Description
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.diseaseDescription}
                  </td>
                </tr>
                <tr>
                  <td className="border border-emerald-500 bg-emerald-200 px-4 py-2 font-medium text-emerald-600">
                    Disease Started On
                  </td>
                  <td className="border border-emerald-500 px-4 py-2 font-medium text-emerald-600">
                    {patientMedicalData?.diseaseStartedOn}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
