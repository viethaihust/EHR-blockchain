"use client";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Form, type FormProps, Input, Button, Spin } from "antd";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  etherAddress?: `0x${string}`;
  name?: string;
  specialty?: string;
};

export default function EditDoctorPage({
  params,
}: {
  params: { id: `0x${string}` };
}) {
  const { data: doctorDetail } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctor",
    args: [params.id],
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { etherAddress, name, specialty } = values;
    writeContract({
      ...medicalRecordContract,
      functionName: "addEditDoctor",
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
    "Sửa bác sĩ thành công.",
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
          etherAddress: doctorDetail?.etherAddress,
          name: doctorDetail?.name,
          specialty: doctorDetail?.specialty,
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Địa chỉ ethereum"
          name="etherAddress"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ ethereum của bác sĩ",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên của bác sĩ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Chuyên môn"
          name="specialty"
          rules={[
            { required: true, message: "Vui lòng nhập chuyên môn của bác sĩ" },
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
              "Đang xác nhận..."
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
