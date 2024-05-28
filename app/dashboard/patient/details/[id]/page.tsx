"use client";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import { Button, Col, Divider, Row, Spin, Table } from "antd";
import { useReadContract } from "wagmi";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const style: React.CSSProperties = { padding: "8px 0" };

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

  return (
    <>
      <div className="px-10">
        <Divider orientation="left">
          Chi tiết bệnh nhân{" "}
          {patientDetail && (
            <>
              <Link href={`/dashboard/patient/edit/${patientDetail.id}`}>
                <Button type="default" size="small" style={{ marginLeft: 16 }}>
                  <span>
                    <EditOutlined style={{ marginRight: 4 }} />
                    Sửa
                  </span>
                </Button>
              </Link>
            </>
          )}
        </Divider>
        {patientDetail ? (
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
        ) : (
          <div className="ml-20">
            <Spin />
          </div>
        )}

        <Divider orientation="left" style={{ marginTop: 50 }}>
          Lịch sử lần khám
          <Link
            href={patientDetail?.id ? `/dashboard/patient/create-visit-history/${patientDetail.id}` : '#'}
          >
            <Button type="default" size="small" style={{ marginLeft: 16 }}>
              <span>
                <FormOutlined style={{ marginRight: 4 }} />
                Tạo
              </span>
            </Button>
          </Link>
        </Divider>
        {visitHistory && (
          <div>
            <Table
              dataSource={visitHistory}
              columns={columns}
              rowKey={record => record.date}
            ></Table>
          </div>
        )}
      </div>
    </>
  );
}
