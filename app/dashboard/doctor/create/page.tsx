"use client";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Form, type FormProps, Input, Button, Spin } from "antd";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  etherAddress?: `0x${string}`;
  name?: string;
  specialty?: string;
};

export default function CreateEditDoctor() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { etherAddress, name, specialty } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addEditDoctorData",
      args: [etherAddress ?? `0x`, name ?? "", specialty ?? ""],
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
    "Create doctor successfully.",
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
          label="Ether Address"
          name="etherAddress"
          rules={[
            { required: true, message: "Please input doctor's etherAddress" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input doctor's name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Specialty"
          name="specialty"
          rules={[
            { required: true, message: "Please input doctor's specialty" },
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
