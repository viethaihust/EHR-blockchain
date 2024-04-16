"use client";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { patientListContract } from "@/smart-contracts/ExampleAbi";
import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
  etherAddress?: `0x${string}`;
};

export default function SearchPatient() {
  const [patientAddress, setPatientAddress] = useState<any>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { etherAddress } = values;
    setPatientAddress(etherAddress);
  };

  const { data: patientData, refetch: refetchPatient } = useReadContract({
    ...patientListContract,
    functionName: "getPatientMedicalList",
    args: [patientAddress ?? `0x`],
  });

  console.log(patientData);

  return (
    <div className="mt-12 p-4">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Patient's ethereum address"
          name="etherAddress"
          rules={[
            {
              required: true,
              message: "Please input patient's ethereum address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              refetchPatient?.();
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
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
                    Covid Vaccine
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
    </div>
  );
}
