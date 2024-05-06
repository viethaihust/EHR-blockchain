"use client";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Form, type FormProps, Input, Button, Spin, Checkbox } from "antd";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  patientId?: string;
  name?: string;
  weight?: bigint;
  height?: bigint;
  bloodGroup?: string;
  bloodPressure?: bigint;
  covidVaccinated?: boolean;
};

export default function CreatePatientPage() {
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = async values => {
    const {
      patientId,
      name,
      weight,
      height,
      bloodGroup,
      bloodPressure,
      covidVaccinated,
    } = values;

    await writeContractAsync({
      ...medicalRecordContract,
      functionName: "addEditPatient",
      args: [
        patientId ?? "",
        name ?? "",
        weight ?? BigInt(0),
        height ?? BigInt(0),
        bloodGroup ?? "",
        bloodPressure ?? BigInt(0),
        covidVaccinated ?? false,
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
    "Create patient successfully.",
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
          label="Patient Id"
          name="patientId"
          rules={[{ required: true, message: "Please input patient's id" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input patient's name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Weight"
          name="weight"
          rules={[{ required: true, message: "Please input patient's weight" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Height"
          name="height"
          rules={[{ required: true, message: "Please input patient's height" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Blood Group"
          name="bloodGroup"
          rules={[
            {
              required: true,
              message: "Please input patient's blood group",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Blood Pressure"
          name="bloodPressure"
          rules={[
            {
              required: true,
              message: "Please input patient's blood pressure",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Covid Vaccinated"
          name="covidVaccinated"
          valuePropName="checked"
        >
          <Checkbox />
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
