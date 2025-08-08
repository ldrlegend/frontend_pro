"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products"); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns: ColumnsType<Product> = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 60,
    //   render: (id: number) => <Tag color="blue">#{id}</Tag>,
    // },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
      width: 100,
      align: 'center',
      render: (product_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{product_code}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 60,
      align: 'center',
      render: (status: string) => (status === "active" ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
    },
    {
      title: "Type of SIM",
      dataIndex: "type_of_sim",
      key: "type_of_sim",
      width: 100,
      align: 'center',
      render: (type_of_sim: string) => <Tag color="blue">{type_of_sim}</Tag>,
    },
    {
      title: "Operator Code",
      dataIndex: "operator_code",
      key: "operator_code",
      width: 100,
      align: 'center',
      render: (operator_code: string) => <Tag color="blue">{operator_code}</Tag>,
    },
    {
      title: "Vendor Code",
      dataIndex: "vendor_code",
      key: "vendor_code",
      width: 100,
      align: 'center',
      render: (vendor_code: string) => <Tag color="blue">{vendor_code}</Tag>,
    },
    {
      title: "Purchase Type",
      dataIndex: "purchase_type",
      key: "purchase_type",
      width: 100,
      align: 'center',
      render: (purchase_type: string) => <Tag color="blue">{purchase_type}</Tag>,
    },
    {
      title: "SKU Type",
      dataIndex: "sku_type",
      key: "sku_type",
      width: 100,
      align: 'center',
      render: (sku_type: string) => <Tag color="blue">{sku_type}</Tag>,
    },
    {
      title: "Data Type",
      dataIndex: "data_type",
      key: "data_type",
      width: 100,
      align: 'center',
      render: (data_type: string) => <span style={{ color: "black" }}>{data_type}</span>,
    },
    {
      title: "Hotspot",
      dataIndex: "hotspot",
      key: "hotspot",
      width: 100,
      align: 'center',
      render: (hotspot: boolean) => <Tag color="blue">{hotspot ? "Yes" : "No"}</Tag>,
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Loading products...</div>
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
      <Title level={2}>Product List</Title>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="product_code"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} products`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default ProductsList;