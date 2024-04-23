"use client";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { Form, type FormProps, Input, Button } from "antd";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";

type FieldType = {
  patientAddress?: `0x${string}`;
  date?: string;
  diagnosis?: string;
  prescription?: string;
};

export default function CreateVisitHistory() {
  const { address } = useAccount();

  const formattedAddress = address || `0x`;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { patientAddress, date, diagnosis, prescription } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addVisitHistory",
      args: [
        patientAddress ?? `0x`,
        formattedAddress,
        date ?? "",
        diagnosis ?? "",
        prescription ?? "",
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
    "Create visit history successfully.",
    error,
  );

  return (
    <div className="mt-12 p-4">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={{
        //   id: patientMedicalData.id,
        //   weight: patientMedicalData?.weight,
        //   height: patientMedicalData?.height,
        //   bloodGroup: patientMedicalData?.bloodGroup,
        //   diseaseName: patientMedicalData?.diseaseName,
        //   diseaseDescription: patientMedicalData?.diseaseDescription,
        //   diseaseStartedOn: patientMedicalData?.diseaseStartedOn,
        //   remember: true,
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Patient Address"
          name="patientAddress"
          rules={[{ required: true, message: "Please input patient address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please input date" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Diagnosis"
          name="diagnosis"
          rules={[{ required: true, message: "Please input diagnosis" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Prescription"
          name="prescription"
          rules={[{ required: true, message: "Please input prescription" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>

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
