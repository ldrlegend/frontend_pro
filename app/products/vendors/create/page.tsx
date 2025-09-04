"use client";

import React from 'react';
import { Card, Space } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
  vendor_code?: string;
  code?: string;
  vendor_name?: boolean;
};

const onFinish = (values: FieldType) => {
  const router = useRouter()
  console.log('Success:', values);
  router.push("/products/vendors")
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const VendorCreateForm: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ vendor_name: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Vendor Code"
      name="vendor_code"
      rules={[{ required: true, message: 'Please input your vendor code!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Code"
      name="code"
      rules={[{ required: false, message: 'Please input your code!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      name="vendor_name"
      valuePropName="checked"
      label="Vendor Name"
    >
      <Input />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form.Item>
  </Form>
);

const VendorCreate: React.FC = () => (
  <Space direction="vertical" size={16}>
    <Card title="Vendor Create" extra={<a href="#">More</a>} style={{ width: 500 }}>
      <VendorCreateForm />
    </Card>
  </Space>
);

export default VendorCreate;