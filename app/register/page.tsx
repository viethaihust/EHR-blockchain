"use client";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Form, type FormProps, Input, Button } from "antd";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import Link from "next/link";
import { useTransactionToast } from "@/app/components/useTransactionToast";

type FieldType = {
  name?: string;
  specialty?: string;
};

export default function RegisterPage() {
  const { address } = useAccount();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { name, specialty } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "register",
      args: [name ?? "", specialty ?? ""],
      account: address,
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
    "Register successfully.",
    error,
  );

  return (
    <div className="mt-12 p-4">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Specialty"
          name="specialty"
          rules={[{ required: true, message: "Please input your specialty" }]}
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
