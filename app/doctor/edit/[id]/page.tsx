"use client";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Form, type FormProps, Input, Button, Spin, Checkbox } from "antd";
import { medicalRecordContract } from "@/smart-contracts/ExampleAbi";
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

export default function EditPatientPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: patientDetail } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatient",
    args: [params.id],
  });
  console.log(patientDetail);

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const {
      patientId,
      name,
      weight,
      height,
      bloodGroup,
      bloodPressure,
      covidVaccinated,
    } = values;
    writeContract({
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
    "Edit patient successfully.",
    error,
  );

  return (
    <div className="mt-12 p-4">
      {patientDetail && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            patientId: patientDetail?.id,
            name: patientDetail?.name,
            weight: patientDetail?.weight,
            height: patientDetail?.height,
            bloodGroup: patientDetail?.bloodGroup,
            bloodPressure: patientDetail?.bloodPressure,
            covidVaccinated: patientDetail?.covidVaccinated,
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Patient Id"
            name="patientId"
            rules={[
              { required: true, message: "Please input patient&apos;s id" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input patient&apos;s name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Weight"
            name="weight"
            rules={[
              { required: true, message: "Please input patient&apos;s weight" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Height"
            name="height"
            rules={[
              { required: true, message: "Please input patient&apos;s height" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Blood Group"
            name="bloodGroup"
            rules={[
              {
                required: true,
                message: "Please input patient&apos;s blood group",
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
                message: "Please input patient&apos;s blood pressure",
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
      )}

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
