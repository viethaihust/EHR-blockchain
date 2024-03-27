"use client";
import React from "react";
import { Table, Button, Modal, Input, Tag } from "antd";
import { useState, useEffect } from "react";

export default function DashboardHospitalPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingHospital, setEditingHospital] = useState<any>(null);
  const [columns, setColumns] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const dataType = "quotes";
  useEffect(() => {
    fetch(`https://dummyjson.com/${dataType}`)
      .then(res => res.json())
      .then(result => {
        const list = result[dataType] || [];
        const firstObject = list[0] || {};
        const cols = [];
        for (const key in firstObject) {
          let render = (value: any) => {
            return <span>{String(value)}</span>;
          };
          if (typeof firstObject[key] === "object") {
            if (Array.isArray(firstObject[key])) {
              render = value => {
                return (
                  <span>
                    {value.map((tag: any) => {
                      return <Tag>{tag}</Tag>;
                    })}
                  </span>
                );
              };
            } else {
              render = value => {
                console.log(value);
                return (
                  <span>
                    {Object.keys(value).map(key => {
                      return (
                        <div>
                          {key}: {value[key]}
                        </div>
                      );
                    })}
                  </span>
                );
              };
            }
          }
          const col = {
            title: String(key).charAt(0).toUpperCase() + String(key).slice(1),
            dataIndex: key,
            render: render,
          };
          cols.push(col);
        }
        cols.push({
          title: "Actions",
          render: (record: any) => (
            <span>
              <Button
                type="default"
                size="small"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  onEditHospital(record);
                }}
              >
                Edit
              </Button>
              <Button
                type="default"
                size="small"
                style={{ marginLeft: 12 }}
                onClick={() => {
                  onDeleteHospital(record);
                }}
              >
                Delete
              </Button>
            </span>
          ),
        });
        setColumns(cols);
        setDataSource(list);
      });
  }, []);

  const onDeleteHospital = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      onOk: () => {
        setDataSource(prev => {
          return prev.filter(result => result.id !== record.id);
        });
      },
    });
  };

  const onEditHospital = (record: any) => {
    setIsEditing(true);
    setEditingHospital({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingHospital(null);
  };

  return (
    <div className="mt-6">
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 650 }} />
      <Modal
        title="Edit Hospital"
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((prev: any) => {
            return prev.map((result: any) => {
              if (result.id === editingHospital.id) {
                return editingHospital;
              } else {
                return result;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editingHospital?.quote}
          onChange={e => {
            setEditingHospital((prev: any) => {
              return { ...prev, quote: e.target.value };
            });
          }}
        ></Input>
        <Input
          className="top-1"
          value={editingHospital?.author}
          onChange={e => {
            setEditingHospital((prev: any) => {
              return { ...prev, author: e.target.value };
            });
          }}
        ></Input>
      </Modal>
    </div>
  );
}
