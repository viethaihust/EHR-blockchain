"use client";
import { Button, Col, Divider, Form, Row, Spin } from "antd";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { medicalRecordContract } from "@/smart-contracts/medicalRecordAbi";
import Link from "next/link";
import { useTransactionToast } from "@/app/components/useTransactionToast";
import { LoadingOutlined } from "@ant-design/icons";

const style: React.CSSProperties = { padding: "8px 0" };

export default function DetailsDoctorPage({
  params,
}: {
  params: { id: `0x${string}` };
}) {
  const { data: doctorDetail, refetch: refetchDoctor } = useReadContract({
    ...medicalRecordContract,
    functionName: "getDoctor",
    args: [params.id],
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const onFinish = () => {
    writeContract({
      ...medicalRecordContract,
      functionName: "approveDoctor",
      args: [params.id, true],
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useTransactionToast(
    isConfirming,
    isConfirmed,
    "Approve doctor successfully.",
    error,
  );

  if (isConfirmed) {
    refetchDoctor?.();
  }

  return (
    <>
      <div className="px-10">
        <Divider orientation="left">
          Doctor Details
          {doctorDetail && (
            <>
              <Link
                href={`/dashboard/doctor/edit/${doctorDetail.etherAddress}`}
              >
                <Button type="default" size="small" style={{ marginLeft: 16 }}>
                  <span>
                    <EditOutlined style={{ marginRight: 4 }} />
                    Edit
                  </span>
                </Button>
              </Link>
            </>
          )}
        </Divider>
        {doctorDetail ? (
          <div>
            <Row gutter={16}>
              <Col className="gutter-row" span={10}>
                <div style={style}>
                  Doctor&apos;s ether address: {doctorDetail.etherAddress}
                </div>
                <div style={style}>Name: {doctorDetail.name}</div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>Specialty: {doctorDetail.specialty}</div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}>
                  Is Approved:{" "}
                  {doctorDetail.isApproved ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={2}>
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Button
                    htmlType="submit"
                    disabled={isPending}
                    style={{
                      background: "green",
                      border: "1px solid black",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
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
                      "Approve Doctor"
                    )}
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="ml-20">
            <Spin />
          </div>
        )}
      </div>
    </>
  );
}
