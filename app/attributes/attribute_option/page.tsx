"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface AttributeOption {
  id: number;
  title: string;
}

const AttributeOptionList = () => {
  const [attributeOptions, setAttributeOptions] = useState<AttributeOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributeOptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/attribute_options`); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching attribute options");
        }
        const data = await response.json();
        setAttributeOptions(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttributeOptions();
  }, []);

  const columns: ColumnsType<AttributeOption> = [
 
    {
      title: "Attribute Code",
      dataIndex: "attribute_code",
      key: "attribute_code",
      width: 100,
      align: 'center',
      render: (attribute_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{attribute_code}</Tag>,
    },
    {
      title: "Attribute Option (VN)",
      dataIndex: "attribute_option_vn",
      key: "attribute_option_vn",
      width: 100,
      align: 'center',
      render: (attribute_option_vn: string) => <span color="blue">{attribute_option_vn}</span>,
    },
    {
      title: "Attribute Option (EN)",
      dataIndex: "attribute_option_en",
      key: "attribute_option_en",
      width: 100,
      align: 'center',
      render: (attribute_option_en: string) => <span color="blue">{attribute_option_en}</span>,
    }
    // {
    //   title: "Date Created",
    //   dataIndex: "date_created",
    //   key: "date_created",
    //   width: 100,
    //   align: 'center',
    //   render: (date_created: string) => <span color="blue">{date_created}</span>,
    // },
    // {
    //   title: "Last Modified Date",
    //   dataIndex: "last_modified_date",
    //   key: "last_modified_date",
    //   width: 100,
    //   align: 'center',
    //   render: (last_modified_date: string) => <span color="blue">{last_modified_date}</span>,
    // },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Loading attribute options...</div>
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
      <Title level={2}>Attribute Option List</Title>
      <Table
        columns={columns}
        dataSource={attributeOptions}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} attribute options`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default AttributeOptionList;