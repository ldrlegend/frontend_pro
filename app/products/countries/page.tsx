"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Alert, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

interface Country {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/countries"); 
        // https://fakestoreapi.com
        if (!response.ok) {
          throw new Error("Error fetching countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const columns: ColumnsType<Country> = [
 
    {
      title: "Country Code",
      dataIndex: "country_code",
      key: "country_code",
      width: 100,
      align: 'center',
      render: (operator_code: string) => <Tag color="blue" style={{ alignItems: "center", justifyContent: "center"}}>{operator_code}</Tag>,
    },
    {
      title: "Country Name (VN)",
      dataIndex: "country_name_vn",
      key: "country_name_vn",
      width: 100,
      align: 'center',
      render: (country_name_vn: string) => <Tag color="blue">{country_name_vn}</Tag>,
    },
    {
      title: "Country Name (EN)",
      dataIndex: "country_name_en",
      key: "country_name_en",
      width: 100,
      align: 'center',
      render: (country_name_en: string) => <Tag color="blue">{country_name_en}</Tag>,
    },
    {
      title: "Type Country",
      dataIndex: "type_country",
      key: "type_country",
      width: 100,
      align: 'center',
      render: (type_country: string) => <Tag color="blue">{type_country}</Tag>,
    },
    {
      title: "Is Popular",
      dataIndex: "is_popular",
      key: "is_popular",
      width: 100,
      align: 'center',
      render: (is_popular: string) => <Tag color="blue">{is_popular}</Tag>,
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      width: 100,
      align: 'center',
      render: (date_created: string) => <Tag color="blue">{date_created}</Tag>,
    },
    {
      title: "Last Modified Date",
      dataIndex: "last_modified_date",
      key: "last_modified_date",
      width: 100,
      align: 'center',
      render: (last_modified_date: string) => <Tag color="blue">{last_modified_date}</Tag>,
    },
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
      <Title level={2}>Country List</Title>
      <Table
        columns={columns}
        dataSource={countries}
        rowKey="country_code"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} countries`,
        }}
        scroll={{ x: 1200 }}
        size="middle"
      />
    </div>
  );
};

export default CountryList;