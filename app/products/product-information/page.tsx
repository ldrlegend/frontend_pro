"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import CreateButton from "@/components/create_button";
import { generateDynamicColumns } from "@/components/appendAttribute";
import { Product } from "@/types/product";

const { Title } = Typography;

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/products`);
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


  // Base columns (static fields like product_code, status, etc.)
  const columns: ColumnsType<Product> = [
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
      width: 100,
      align: 'center',
      render: (product_code: string) => <Tag color="blue">{product_code}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 60,
      align: 'center',
      render: (status: string) => (status.toLowerCase() === "active" ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
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
      title: "Operator Code",
      dataIndex: "operator_code",
      key: "operator_code",
      width: 100,
      align: 'center',
      render: (operator_code: string) => <Tag color="blue">{operator_code}</Tag>,
    },
    {
      title: "Supported Countries",
      dataIndex: "supported_countries",
      key: "supported_countries",
      width: 100,
      align: 'center',
      render: (supported_countries: string) => <span>{supported_countries}</span>,
    },
    // {
    //   title: "Date Created",
    //   dataIndex: "date_created",
    //   key: "date_created",
    //   width: 100,
    //   align: 'center',
    //   render: (date_created: string) => <span>{date_created}</span>,
    // },
    // {
    //   title: "Last Modified Date",
    //   dataIndex: "last_modified_date",
    //   key: "last_modified_date",
    //   width: 100,
    //   align: 'center',
    //   render: (last_modified_date: string) => <span>{last_modified_date}</span>,
    // },
  ];

  // Generate dynamic columns based on product attributes
  const dynamicColumns = generateDynamicColumns(products);

  // Merge static columns and dynamic columns
  const finalColumns = [...columns, ...dynamicColumns];

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

  // Map product data to match the final columns, including dynamic attributes
  const data = products.map((product) => {
    const productWithAttributes: any = { ...product };

    // Flatten the attribute object into the main product object
    if (product.attribute && typeof product.attribute === 'object') {
      Object.keys(product.attribute).forEach((attribute) => {
        productWithAttributes[`attribute_${attribute}`] = product.attribute![attribute];
      });
    }

    return productWithAttributes;
  });

  return (
    <div style={{ padding: "20px", overflowX: "scroll", overflowY: "scroll", alignItems: "center", justifyContent: "center" }}>
      <Title level={2}>Product List</Title>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CreateButton page="product-information" />
      </div>
      <Table
        columns={finalColumns as ColumnType<Product>[]}
        dataSource={data}
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
