"use client";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { Form, type FormProps, Input, Button } from "antd";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";

type FieldType = {
  etherAddress?: `0x${string}`;
  name?: string;
  specialty?: string;
};

export default function CreateEditDoctor() {
  const { address } = useAccount();

  const formattedAddress = address || `0x`;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { name, specialty } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addEditDoctorData",
      args: [formattedAddress, name ?? "", specialty ?? ""],
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
    "Create/Edit doctor successfully.",
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Specialty"
          name="specialty"
          rules={[{ required: true, message: "Please input specialty" }]}
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
