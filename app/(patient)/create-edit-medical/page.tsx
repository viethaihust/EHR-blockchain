"use client";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import { Form, type FormProps, Input, Button, Checkbox } from "antd";
import { patientListContract } from "@/smart-contracts/ExampleAbi";

type FieldType = {
  etherAddress?: `0x${string}`;
  name?: string;
  weight?: bigint;
  height?: bigint;
  bloodGroup?: string;
  bloodPressure?: bigint;
  covidVaccine?: boolean;
};

export default function EditMedicalPatientPage() {
  // const [patientMedicalData, setPatientMedicalData] = useState<any>(null);

  const { address } = useAccount();

  const formattedAddress = address || `0x`;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { name, weight, height, bloodGroup, bloodPressure, covidVaccine } =
      values;
    writeContract({
      ...patientListContract,
      functionName: "addEditPatientMedicalData",
      args: [
        formattedAddress,
        name ?? "",
        weight ?? BigInt(0),
        height ?? BigInt(0),
        bloodGroup ?? "",
        bloodPressure ?? BigInt(0),
        covidVaccine ?? false,
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

  // console.log(patientMedicalData);

  return (
    <div className="p-4 mt-12">
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
          label="Weight"
          name="weight"
          rules={[{ required: true, message: "Please input weight" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Height"
          name="height"
          rules={[{ required: true, message: "Please input height" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Blood Group"
          name="bloodGroup"
          rules={[{ required: true, message: "Please input blood group" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Blood Pressure"
          name="bloodPressure"
          rules={[{ required: true, message: "Please input blood pressure" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Covid Vaccine"
          name="covidVaccine"
          valuePropName="checked"
          rules={[{ required: false }]}
        >
          <Checkbox />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>

      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
}
