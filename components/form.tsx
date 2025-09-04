import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];

interface FormComponentProps {
  onClose: () => void; // Add onClose function to close the form after submission
}

const FormComponent: React.FC<FormComponentProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  // Handle form submission
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // You can add your API call or logic to save the form data here
    onClose(); // Close the form after submission
  };

  return (
    <Form
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      onFinish={onFinish} // Handle the form submission
      style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
    >
      <Form.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Field A" name="fieldA" rules={[{ required: true, message: 'Please input Field A!' }]}>
        <Input placeholder="Input placeholder" />
      </Form.Item>

      <Form.Item label="Field B" name="fieldB" rules={[{ required: true, message: 'Please input Field B!' }]}>
        <Input placeholder="Input placeholder" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
