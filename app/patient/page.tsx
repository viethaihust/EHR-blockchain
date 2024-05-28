"use client";
import { Suspense } from "react";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import {
  Button,
  Col,
  Divider,
  Form,
  FormProps,
  Input,
  Row,
  Table,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const style: React.CSSProperties = { padding: "8px 0" };

type FieldType = {
  patientId?: string;
};

const columns = [
  {
    title: "Id bệnh nhân",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Địa chỉ ethereum của bác sĩ",
    dataIndex: "doctorAddress",
    key: "doctorAddress",
  },
  {
    title: "Ngày",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Chẩn đoán",
    dataIndex: "diagnosis",
    key: "diagnosis",
  },
  {
    title: "Đơn thuốc",
    dataIndex: "prescription",
    key: "prescription",
  },
];

function PatientForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [form] = Form.useForm();
  const [patientId, setPatientId] = useState<string>("");

  const createQueryString = useCallback(
    (patientId_: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", patientId_);
      return params.toString();
    },
    [searchParams],
  );

  // state => route
  useEffect(() => {
    if (patientId) {
      router.push(pathname + "?" + createQueryString(patientId));
    } else {
      router.push(pathname);
    }
  }, [createQueryString, pathname, router, patientId]);

  //  route => state
  useEffect(() => {
    const patientId_ = searchParams.get("id") ?? "";
    if (patientId_ !== patientId) {
      setPatientId(patientId_);
      form.setFieldValue("patientId", patientId_);
    }
  }, [searchParams]);

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    if (patientId === values.patientId) {
      console.log("refetchPatient");
      refetchPatient?.();
    }
    setPatientId(values.patientId ?? "");
  };

  const { data: patientDetail, refetch: refetchPatient } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatient",
    args: [patientId],
  });

  const { data: visitHistory } = useReadContract({
    ...medicalRecordContract,
    functionName: "getVisitHistoriesByPatient",
    args: [patientId],
  });

  return (
    <div className="mt-12 p-4 px-32">
      <div className="text-2xl mb-10">Nhập id bệnh nhân để hiển thị bệnh án</div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Id bệnh nhân"
          name="patientId"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập id bệnh nhân",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {!patientDetail || patientDetail.id === "" ? (
        <div>Không tìm thấy bệnh nhân</div>
      ) : (
        <div>
          <Divider orientation="left">Chi tiết bệnh nhân</Divider>
          <div>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div style={style}>Id bệnh nhân: {patientDetail.id}</div>
                <div style={style}>Họ và tên: {patientDetail.name}</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  Cân nặng: {patientDetail.weight.toString()} kg
                </div>
                <div style={style}>
                  Chiều cao: {patientDetail.height.toString()} cm
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>Nhóm máu: {patientDetail.bloodGroup}</div>
                <div style={style}>
                  Huyết áp: {patientDetail.bloodPressure.toString()} mmHg
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  Đã tiêm vắc xin covid:{" "}
                  {patientDetail.covidVaccinated ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}

      <div>
        <Divider orientation="left" style={{ marginTop: 50 }}>
          Lịch sử khám
        </Divider>

        <Table
          dataSource={visitHistory ?? []}
          columns={columns}
          rowKey={record => record.date}
        ></Table>
      </div>
    </div>
  );
}

export default function PatientPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <PatientForm />
    </Suspense>
  );
}