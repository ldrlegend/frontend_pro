"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Attribute {
  id: number;
  title: string;
}

const AttributeList = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/attributes`); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching attributes");
        }
        const data = await response.json();
        setAttributes(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  const columns: ColumnsType<Attribute> = [
 
    {
      title: "Attribute Code",
      dataIndex: "attribute_code",
      key: "attribute_code",
      width: 100,
      align: 'center',
      render: (attribute_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{attribute_code}</Tag>,
    },
    {
      title: "Attribute Name (VN)",
      dataIndex: "attribute_name_vn",
      key: "attribute_name_vn",
      width: 100,
      align: 'center',
      render: (attribute_name_vn: string) => <span color="blue">{attribute_name_vn}</span>,
    },
    {
      title: "Attribute Name (EN)",
      dataIndex: "attribute_name_en",
      key: "attribute_name_en",
      width: 100,
      align: 'center',
      render: (attribute_name_en: string) => <span color="blue">{attribute_name_en}</span>,
    },
    {
      title: "Type Attribute",
      dataIndex: "type_attribute",
      key: "type_attribute",
      width: 100,
      align: 'center',
      render: (type_attribute: string) => <Tag color="green">{type_attribute}</Tag>,
    },
    {
      title: "Attribute Group",
      dataIndex: "attribute_group",
      key: "attribute_group",
      width: 100,
      align: 'center',
      render: (attribute_group: string) => <Tag color="blue">{attribute_group}</Tag>,
    },
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
        <div style={{ marginTop: "16px" }}>Loading attributes...</div>
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
      <Title level={2}>Attribute List</Title>
      <Table
        columns={columns}
        dataSource={attributes}
        rowKey="attribute_code"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} attributes`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default AttributeList;