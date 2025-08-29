"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Operator {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const OperatorList = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/operators"); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching operators");
        }
        const data = await response.json();
        setOperators(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const columns: ColumnsType<Operator> = [
 
    {
      title: "Operator Code",
      dataIndex: "operator_code",
      key: "operator_code",
      width: 100,
      align: 'center',
      render: (operator_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{operator_code}</Tag>,
    },
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    //   width: 60,
    //   align: 'center',
    //   render: (code: string) => <Tag color="blue">{code}</Tag>,
    // },
    {
      title: "Operator Name",
      dataIndex: "operator_name",
      key: "operator_name",
      width: 100,
      align: 'center',
      render: (operator_name: string) => <Tag color="blue">{operator_name}</Tag>,
    },
    {
      title: "Country Code",
      dataIndex: "country_code",
      key: "country_code",
      width: 100,
      align: 'center',
      render: (country_code: string) => <Tag color="blue">{country_code}</Tag>,
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Loading operators...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <div style={{ padding: "20px", overflowX: "scroll", overflowY: "scroll", alignItems: "center", justifyContent: "center" }}>
      <Title level={2}>Operator List</Title>
      <Table
        columns={columns}
        dataSource={operators}
        rowKey="operator_code"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} operators`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default OperatorList;
