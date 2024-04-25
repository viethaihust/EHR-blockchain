"use client";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Button, Col, Divider, Form, FormProps, Input, Row, Spin, Table } from "antd";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const style: React.CSSProperties = { padding: "8px 0" };

type FieldType = {
  patientId?: string;
};

const columns = [
  {
    title: "Patient Id",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "Doctor Address",
    dataIndex: "doctorAddress",
    key: "doctorAddress",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
  },
  {
    title: "Prescription",
    dataIndex: "prescription",
    key: "prescription",
  },
];

export default function PatientPage() {
  const [patientId, setPatientId] = useState<any>(null);

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const { patientId } = values;
    setPatientId(patientId);
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

  console.log(patientId);
  console.log(patientDetail);

  return (
    <div className="mt-12 p-4">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Patient's id"
          name="patientId"
          rules={[
            {
              required: true,
              message: "Please input patient's id",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              refetchPatient?.();
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      {patientDetail && (
        <div className="px-10">
          <Divider orientation="left">Patient Details</Divider>
          <div>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div style={style}>Patient Id: {patientDetail.id}</div>
                <div style={style}>Name: {patientDetail.name}</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  Weight: {patientDetail.weight.toString()} kg
                </div>
                <div style={style}>
                  Height: {patientDetail.height.toString()} cm
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>Blood Group: {patientDetail.bloodGroup}</div>
                <div style={style}>
                  Blood Pressure: {patientDetail.bloodPressure.toString()} mmHg
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  Covid Vaccinated:{" "}
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

      {visitHistory && (
        <div>
          <Divider orientation="left" style={{ marginTop: 50 }}>
            Visit History
          </Divider>

          <Table
            dataSource={visitHistory}
            columns={columns}
            rowKey={record => record.date}
          ></Table>
        </div>
      )}
    </div>
  );
}
