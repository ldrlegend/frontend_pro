import React from "react";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Product } from "@/types/product";

// Function to generate dynamic columns based on attributes
export const generateDynamicColumns = (products: Product[]): ColumnsType<Product> => {
  const attributeKeys = new Set<string>();

  // Loop through products to collect all unique attribute keys
  products.forEach((product) => {
    if (product.attribute && typeof product.attribute === 'object') {
      Object.keys(product.attribute).forEach((key) => {
        attributeKeys.add(key);
      });
    }
  });

  // Create columns for each attribute
  const dynamicColumns = Array.from(attributeKeys).map((attribute) => ({
    title: attribute.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()), // Convert snake_case to Title Case
    dataIndex: `attribute_${attribute}`,
    key: `attribute_${attribute}`,
    width: 150,
    align: 'center' as const,
    render: (value: string) => (
      <Tag color="blue" style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {value || '-'}
      </Tag>
    ),
  }));

  return dynamicColumns;
};

// Function to append attribute columns to the existing data
export const appendAttributes = (products: Product[]): Product[] => {
  return products.map((product) => {
    const productWithAttributes: any = { ...product };

    // Flatten the attribute object into the main product object
    if (product.attribute && typeof product.attribute === 'object') {
      Object.keys(product.attribute).forEach((attribute) => {
        productWithAttributes[`attribute_${attribute}`] = product.attribute![attribute];
      });
    }

    return productWithAttributes;
  });
};