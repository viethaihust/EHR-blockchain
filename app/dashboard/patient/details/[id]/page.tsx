"use client";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Col, Divider, Row, Spin, Table } from "antd";
import { useReadContract } from "wagmi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const style: React.CSSProperties = { padding: "8px 0" };

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

export default function DetailsPatientPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: patientDetail } = useReadContract({
    ...medicalRecordContract,
    functionName: "getPatient",
    args: [params.id],
  });

  const { data: visitHistory } = useReadContract({
    ...medicalRecordContract,
    functionName: "getVisitHistoriesByPatient",
    args: [params.id],
  });
  console.log(patientDetail);
  return (
    <>
      <div className="px-10">
        <Divider orientation="left">Patient Details</Divider>
        {patientDetail ? (
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
        ) : (
          <div className="ml-20">
            <Spin />
          </div>
        )}

        <Divider orientation="left" style={{ marginTop: 50 }}>
          Visit History
        </Divider>
        {visitHistory && (
          <div>
            <Table
              dataSource={visitHistory}
              columns={columns}
              rowKey={record => record.patientId}
            ></Table>
          </div>
        )}
      </div>
    </>
  );
}