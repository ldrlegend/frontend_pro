"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Vendor {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const VendorsList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/vendors"); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const columns: ColumnsType<Vendor> = [
 
    {
      title: "Vendor Code",
      dataIndex: "vendor_code",
      key: "vendor_code",
      width: 100,
      align: 'center',
      render: (vendor_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{vendor_code}</Tag>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 60,
      align: 'center',
      render: (code: string) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
      width: 100,
      align: 'center',
      render: (vendor_name: string) => <Tag color="blue">{vendor_name}</Tag>,
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Loading vendors...</div>
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
      <Title level={2}>Vendor List</Title>
      <Table
        columns={columns}
        dataSource={vendors}
        rowKey="vendor_code"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} vendors`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default VendorsList;
