"use client";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Form, type FormProps, Input, Button } from "antd";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Title from "antd/es/typography/Title";
import { UserOutlined, ProfileOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type FieldType = {
  name?: string;
  specialty?: string;
};

export default function RegisterPage() {
  const { address } = useAccount();
  const router = useRouter();

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

  useTransactionToast(isConfirming, isConfirmed, "Đăng ký thành công.", error);

  useEffect(() => {
    if (isConfirmed) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [isConfirmed, router]);

  return (
    <div className="flex h-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <Title level={2} className="text-center">
          Đăng ký
        </Title>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Chuyên môn"
            name="specialty"
            rules={[{ required: true, message: "Vui lòng nhập chuyên môn" }]}
          >
            <Input prefix={<ProfileOutlined />} placeholder="Specialty" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isPending}
              className="mt-5 w-full"
            >
              {isPending ? "Đang xác nhận..." : "Đăng ký"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
