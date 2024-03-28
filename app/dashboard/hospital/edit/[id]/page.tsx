"use client";
import React from "react";
import { Button, Form, type FormProps, Input } from "antd";

type FieldType = {
  hospitalName?: string;
  address?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = values => {
  console.log("Success:", values);
};

export default function EditHospitalPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl">Edit Hospital</h1>
      </div>
      <div className="mt-10 w-fit border-[1px] p-10">
        <Form
          name="add-doctor"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Hospital Name"
            name="hospitalName"
            rules={[
              {
                required: true,
                message: "Please enter hospital name",
              },
              {
                whitespace: true,
              },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter hospital name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter hospital address",
              },
              {
                whitespace: true,
              },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter hospital address" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} className="!mb-0">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
