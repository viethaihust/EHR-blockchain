"use client";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import { patientListContract } from "@/smart-contracts/ExampleAbi";
import { Button, Form, FormProps, Input } from "antd";
import Link from "next/link";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

type FieldType = {
  etherAddress?: `0x${string}`;
};

export default function GrantAccess() {
  const { address } = useAccount();

  const formattedAddress = address || `0x`;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { etherAddress } = values;
    writeContract({
      ...patientListContract,
      functionName: "givePermission",
      args: [formattedAddress, etherAddress ?? `0x`],
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
    "Grant access successfully.",
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
          label="Doctor's ethereum address"
          name="etherAddress"
          rules={[
            {
              required: true,
              message: "Please input doctor's ethereum address",
            },
          ]}
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
