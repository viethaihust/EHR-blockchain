"use client"
import React from 'react';
import { Table } from 'antd';
import { useState, useEffect } from 'react';

export default function Hospitals() {
  const [columns, setColumns] = useState([]);

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes')
    .then(res => res.json())
    .then((result)=>{
        const list = result.quotes || [];
        const firstObject = list[0] || {};
        const cols = [];
        for (const key in firstObject) {
            const col = {
                title: key,
                dataIndex: key
            }
            cols.push(col);
        }
        setColumns(cols);
        setDataSource(result.quotes);
    });
  },[])
  return <Table columns={columns} dataSource={dataSource} scroll={{ y: 500}} />;
};