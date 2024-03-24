"use client";
import React from "react";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { Button } from 'antd'

export default function Hospitals() {
  const [columns, setColumns] = useState([]);

  const [dataSource, setDataSource] = useState([]);

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
              <Button type="default" size="small">
                Edit
              </Button>
              <Button type="default" size="small" style={{ marginLeft: 8 }}>
                Delete
              </Button>
            </span>
          ),
        });
        setColumns(cols);
        setDataSource(result.quotes);
      });
  }, []);
  return (
    <Table columns={columns} dataSource={dataSource} scroll={{ y: 500 }} />
  );
}
