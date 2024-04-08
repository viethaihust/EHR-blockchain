"use client";
import React from "react";
import { DatePicker, Select, Table, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Button, Form, type FormProps, Input } from "antd";

type FieldType = {
  fullName?: string;
  email?: string;
  phoneNumber?: number;
  gender?: string;
  dob?: Date;
  description: string;
  specialty: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "View doctors",
    children: (
      <>
        <div><Table></Table></div>
      </>
    ),
  },
  {
    key: "2",
    label: "Add doctor",
    children: (
      <>
        <div>
          <Form
            name="add-doctor"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
                {
                  whitespace: true,
                },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
                {
                  whitespace: true,
                },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter phone number",
                },
                {
                  whitespace: true,
                },
                { min: 9 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item<FieldType> label="Gender" name="gender">
              <Select
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
            </Form.Item>

            <Form.Item<FieldType> label="Date of Birth" name="dob" hasFeedback>
              <DatePicker picker="date" placeholder="Choose date of birth" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
                {
                  whitespace: true,
                },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter description" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Specialty"
              name="specialty"
              rules={[
                {
                  required: true,
                  message: "Please enter specialty",
                },
                {
                  whitespace: true,
                },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter specialty" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    ),
  },
];

export default function DashboardDoctorPage() {
  return <Tabs defaultActiveKey="1" items={items} />;
}
