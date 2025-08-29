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
      render: (status: string) => (status.toLowerCase() === "active" ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
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
      title: "Base SIM SKU Code",
      dataIndex: "base_sim_sku_code",
      key: "base_sim_sku_code",
      width: 100,
      align: 'center',
      render: (base_sim_sku_code: string) => <span style={{ color: "black" }}>{base_sim_sku_code}</span>,
    },
    {
      title: "Import Type",
      dataIndex: "import_type",
      key: "import_type",
      width: 100,
      align: 'center',
      render: (import_type: string) => <span style={{ color: "black" }}>{import_type}</span>,
    },
    {
      title: "Supported Countries",
      dataIndex: "supported_countries",
      key: "supported_countries",
      width: 100,
      align: 'center',
      render: (supported_countries: string) => <span style={{ color: "black" }}>{supported_countries}</span>,
    },
    {
      title: "Daily Reset Time",
      dataIndex: "daily_reset_time",
      key: "daily_reset_time",
      width: 100,
      align: 'center',
      render: (daily_reset_time: string) => <span style={{ color: "black" }}>{daily_reset_time}</span>,
    },
    {
      title: "Network Type",
      dataIndex: "network_type",
      key: "network_type",
      width: 100,
      align: 'center',
      render: (network_type: string) => <span style={{ color: "black" }}>{network_type}</span>,
    },
    {
      title: "APN",
      dataIndex: "apn",
      key: "apn",
      width: 100,
      align: 'center',
      render: (apn: string) => <span style={{ color: "black" }}>{apn}</span>,
    },
    {
      title: "Onsite Carrier",
      dataIndex: "onsite_carrier",
      key: "onsite_carrier",
      width: 100,
      align: 'center',
      render: (onsite_carrier: string) => <span style={{ color: "black" }}>{onsite_carrier}</span>,
    },
    {
      title: "Local Number Country",
      dataIndex: "local_number_country",
      key: "local_number_country",
      width: 100,
      align: 'center',
      render: (local_number_country: string) => <span style={{ color: "black" }}>{local_number_country}</span>,
    },
    {
      title: "KYC Needed",
      dataIndex: "kyc_needed",
      key: "kyc_needed",
      width: 100,
      align: 'center',
      render: (kyc_needed: string) => <span style={{ color: "black" }}>{kyc_needed}</span>,
    },
    {
      title: "Top Up Options",
      dataIndex: "top_up_options",
      key: "top_up_options",
      width: 100,
      align: 'center',
      render: (top_up_options: string) => <span style={{ color: "black" }}>{top_up_options}</span>,
    },
    {
      title: "Unsupported Apps",
      dataIndex: "unsupported_apps",
      key: "unsupported_apps",
      width: 100,
      align: 'center',
      render: (unsupported_apps: string) => <span style={{ color: "black" }}>{unsupported_apps}</span>,
    },
    {
      title: "Data Plan Type",
      dataIndex: "data_plan_type",
      key: "data_plan_type",
      width: 100,
      align: 'center',
      render: (data_plan_type: string) => <span style={{ color: "black" }}>{data_plan_type}</span>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: 100,
      align: 'center',
      render: (note: string) => <span style={{ color: "black" }}>{note}</span>,
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      width: 100,
      align: 'center',
      render: (date_created: string) => <span style={{ color: "black" }}>{date_created}</span>,
    },
    {
      title: "Last Modified Date",
      dataIndex: "last_modified_date",
      key: "last_modified_date",
      width: 100,
      align: 'center',
      render: (last_modified_date: string) => <span style={{ color: "black" }}>{last_modified_date}</span>,
    },
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