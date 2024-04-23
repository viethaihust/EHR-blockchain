"use client";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
  useReadContract,
} from "wagmi";
import { Form, type FormProps, Input, Button, Checkbox } from "antd";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import Link from "next/link";
import { useTransactionToast } from "@/app/components/useTransactionToast";

type FieldType = {
  etherAddress?: `0x${string}`;
  name?: string;
  weight?: bigint;
  height?: bigint;
  bloodGroup?: string;
  bloodPressure?: bigint;
  covidVaccine?: boolean;
};

export default function EditMedicalPatientPage() {
  const { address } = useAccount();

  const formattedAddress = address || `0x`;

  const { data: patientData } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatientMedicalList",
    args: [formattedAddress],
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { name, weight, height, bloodGroup, bloodPressure, covidVaccine } =
      values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addEditPatientMedicalData",
      args: [
        formattedAddress,
        name ?? "",
        weight ?? BigInt(0),
        height ?? BigInt(0),
        bloodGroup ?? "",
        bloodPressure ?? BigInt(0),
        covidVaccine ?? false,
      ],
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useTransactionToast(
    isConfirming,
    isConfirmed,
    "Create/Edit patient successfully.",
    error,
  );

  return (
    <div className="mt-12 p-4">
      {patientData && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            name: patientData?.name,
            weight: patientData?.weight,
            height: patientData?.height,
            bloodGroup: patientData?.bloodGroup,
            bloodPressure: patientData?.bloodPressure,
            covidVaccine: patientData?.covidVaccine,
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "Please input weight" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Height"
            name="height"
            rules={[{ required: true, message: "Please input height" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Blood Group"
            name="bloodGroup"
            rules={[{ required: true, message: "Please input blood group" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Blood Pressure"
            name="bloodPressure"
            rules={[{ required: true, message: "Please input blood pressure" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Covid Vaccinated"
            name="covidVaccine"
            valuePropName="checked"
            rules={[{ required: false }]}
          >
            <Checkbox />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? "Confirming..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      )}

      {hash && isConfirmed && (
        <div className="ml-10">
          Click to see transaction:{" "}
          <Link
            href={"https://sepolia-optimism.etherscan.io/tx/" + hash}
            className=""
          >
            {"https://sepolia-optimism.etherscan.io/tx/" + hash}
          </Link>
        </div>
      )}
    </div>
  );
}
