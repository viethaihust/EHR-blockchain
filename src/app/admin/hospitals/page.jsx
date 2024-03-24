"use client";
import React from "react";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";

export default function Hospitals() {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/quotes")
      .then((res) => res.json())
      .then((result) => {
        const list = result.quotes || [];
        const firstObject = list[0] || {};
        const cols = [];
        for (const key in firstObject) {
          const col = {
            title: key,
            dataIndex: key,
          };
          cols.push(col);
        }
        cols.push({
          title: "Actions",
          render: (text, record) => (
            <span>
              <Button
                type="default"
                size="small"
                style={{ marginLeft: 8 }}
                onClick={showModal}
              >
                Edit
              </Button>
            </span>
          ),
        });
        setColumns(cols);
        setDataSource(result.quotes);
      });
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 620 }} />
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
