"use client"

import { useState } from "react"
import { Button, Input, Form, Select, Radio, Card, Space, Row, Col, Typography, Divider } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const { Title, Text } = Typography
const { Option } = Select

interface SkuFormData {
  skuName: string
  skuCode: string
  typeOfSim: string
  category: string
  dataType: string
  dataAmount: string
  dayAmount: string
  operator: string
  networkType: string
  dataResetTime: string
  throttleSpeed: string
  apn: string
  status: string
  vendor: string
  vendorSku: string
  purchaseType: string
}

function SkuCreateEditPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SkuFormData>({
    skuName: "",
    skuCode: "",
    typeOfSim: "",
    category: "",
    dataType: "",
    dataAmount: "",
    dayAmount: "",
    operator: "",
    networkType: "",
    dataResetTime: "",
    throttleSpeed: "",
    apn: "",
    status: "active",
    vendor: "",
    vendorSku: "",
    purchaseType: "",
  })

  const handleInputChange = (field: keyof SkuFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
  }

  const handleCancel = () => {
    router.push("/products/product-information")
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #d9d9d9", background: "white", padding: "16px 24px" }}>
        <Row justify="space-between" align="middle">
          <Space split={<ArrowRightOutlined />}>
            <Text type="secondary">SKU Management</Text>
            <Text strong>Create</Text>
          </Space>
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>Create</Button>
          </Space>
        </Row>
      </div>

      {/* Main Content */}
      <div style={{ padding: "24px" }}>
        <Row gutter={24}>
          {/* Left Column */}
          <Col flex="1">
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              {/* General Section */}
              <Card title="General" size="default">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item 
                        label={<span>SKU Name <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Input
                          placeholder="SKU Name"
                          value={formData.skuName}
                          onChange={(e) => handleInputChange("skuName", e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item 
                        label={<span>SKU Code <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Input
                          placeholder="SKU Code"
                          value={formData.skuCode}
                          onChange={(e) => handleInputChange("skuCode", e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        label={<span>Type Of SIM <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Select
                          placeholder="Select Type Of SIM"
                          value={formData.typeOfSim}
                          onChange={(value) => handleInputChange("typeOfSim", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="physical">Physical SIM</Option>
                          <Option value="esim">eSIM</Option>
                          <Option value="hybrid">Hybrid</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Category">
                        <Select
                          placeholder="Select Category"
                          value={formData.category}
                          onChange={(value) => handleInputChange("category", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="prepaid">Prepaid</Option>
                          <Option value="postpaid">Postpaid</Option>
                          <Option value="data-only">Data Only</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item 
                        label={<span>Data Type <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Select
                          placeholder="Select Data Type"
                          value={formData.dataType}
                          onChange={(value) => handleInputChange("dataType", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="unlimited">Unlimited</Option>
                          <Option value="limited">Limited</Option>
                          <Option value="pay-as-you-go">Pay As You Go</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item 
                        label={<span>Data Amount <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Select
                          placeholder="Select Data Amount"
                          value={formData.dataAmount}
                          onChange={(value) => handleInputChange("dataAmount", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="1gb">1 GB</Option>
                          <Option value="5gb">5 GB</Option>
                          <Option value="10gb">10 GB</Option>
                          <Option value="unlimited">Unlimited</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item 
                        label={<span>Day Amount <span style={{ color: "red" }}>*</span></span>}
                        required
                      >
                        <Select
                          placeholder="Select Day Amount"
                          value={formData.dayAmount}
                          onChange={(value) => handleInputChange("dayAmount", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="1">1 Day</Option>
                          <Option value="7">7 Days</Option>
                          <Option value="30">30 Days</Option>
                          <Option value="90">90 Days</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>

              {/* Attributes Section */}
              <Card title="Attributes" size="default">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Operator">
                        <Select
                          placeholder="Select Operator"
                          value={formData.operator}
                          onChange={(value) => handleInputChange("operator", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="verizon">Verizon</Option>
                          <Option value="att">AT&T</Option>
                          <Option value="tmobile">T-Mobile</Option>
                          <Option value="sprint">Sprint</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Network Type">
                        <Select
                          placeholder="Select Network Type"
                          value={formData.networkType}
                          onChange={(value) => handleInputChange("networkType", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="4g">4G</Option>
                          <Option value="5g">5G</Option>
                          <Option value="3g">3G</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Data Reset Time">
                        <Select
                          placeholder="Select Data Reset Time"
                          value={formData.dataResetTime}
                          onChange={(value) => handleInputChange("dataResetTime", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="daily">Daily</Option>
                          <Option value="weekly">Weekly</Option>
                          <Option value="monthly">Monthly</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Throttle Speed">
                        <Select
                          placeholder="Select Throttle Speed"
                          value={formData.throttleSpeed}
                          onChange={(value) => handleInputChange("throttleSpeed", value)}
                          style={{ width: "100%" }}
                        >
                          <Option value="128kbps">128 Kbps</Option>
                          <Option value="256kbps">256 Kbps</Option>
                          <Option value="512kbps">512 Kbps</Option>
                          <Option value="no-throttle">No Throttle</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="APN">
                        <Input
                          placeholder="APN"
                          value={formData.apn}
                          onChange={(e) => handleInputChange("apn", e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Space>
          </Col>

          {/* Right Column */}
          <Col span={8}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              {/* Status Section */}
              <Card title="Status" size="default">
                <Form.Item label="Status">
                  <Radio.Group
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                  >
                    <Space direction="vertical">
                      <Radio value="active">Active</Radio>
                      <Radio value="temporary">Temporary</Radio>
                      <Radio value="preparing">Preparing</Radio>
                      <Radio value="inactive">Inactive</Radio>
                      <Radio value="deleted">Deleted</Radio>
                      <Radio value="b2bonly">B2BOnly</Radio>
                      <Radio value="lowstock">Low Stock</Radio>
                      <Radio value="ecomonly">Ecom-Only</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>

              {/* Fulfillment Section */}
              <Card title="Fulfillment" size="default">
                <Form layout="vertical">
                  <Form.Item 
                    label={<span>Vendor <span style={{ color: "red" }}>*</span></span>}
                    required
                  >
                    <Select
                      placeholder="Select Vendor"
                      value={formData.vendor}
                      onChange={(value) => handleInputChange("vendor", value)}
                      style={{ width: "100%" }}
                    >
                      <Option value="vendor1">Vendor 1</Option>
                      <Option value="vendor2">Vendor 2</Option>
                      <Option value="vendor3">Vendor 3</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item 
                    label={<span>Vendor SKU <span style={{ color: "red" }}>*</span></span>}
                    required
                  >
                    <Input
                      placeholder="Vendor SKU"
                      value={formData.vendorSku}
                      onChange={(e) => handleInputChange("vendorSku", e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item 
                    label={<span>Purchase Type <span style={{ color: "red" }}>*</span></span>}
                    required
                  >
                    <Select
                      placeholder="Select Purchase Type"
                      value={formData.purchaseType}
                      onChange={(value) => handleInputChange("purchaseType", value)}
                      style={{ width: "100%" }}
                    >
                      <Option value="one-time">One-time</Option>
                      <Option value="subscription">Subscription</Option>
                      <Option value="bulk">Bulk</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SkuCreateEditPage