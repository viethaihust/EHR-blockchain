"use client";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Form, type FormProps, Input, Button, Spin } from "antd";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  patientId?: string;
  date?: string;
  diagnosis?: string;
  prescription?: string;
};

export default function CreateVisitHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { address } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { patientId, date, diagnosis, prescription } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addVisitHistoryByDoctor",
      args: [patientId ?? "", date ?? "", diagnosis ?? "", prescription ?? ""],
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
        initialValues={{
          patientId: params.id,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Patient Id"
          name="patientId"
          rules={[{ required: true, message: "Please input patient's id" }]}
        >
          <Input disabled />
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
          rules={[
            { required: true, message: "Please input patient's diagnosis" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Prescription"
          name="prescription"
          rules={[
            { required: true, message: "Please input patient's prescription" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isPending}
            style={{ display: "flex", alignItems: "center" }}
          >
            {isConfirming ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 16, color: "white" }}
                    spin
                  />
                }
              />
            ) : isPending ? (
              "Confirming..."
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Item>
      </Form>

      {hash && isConfirmed && (
        <div className="ml-10">
          Click to see transaction:{" "}
          <Link href={"https://sepolia-optimism.etherscan.io/tx/" + hash}>
            {"https://sepolia-optimism.etherscan.io/tx/" + hash}
          </Link>
        </div>
      )}
    </div>
  );
}
