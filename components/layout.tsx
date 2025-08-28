"use client";

import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useToken } from 'antd/es/theme/internal';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, token] = useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const router = useRouter();
  const pathname = usePathname();

  // Set name in the logo
  const logoName = 'Gohub Admin';
  
  // Top navigation menu
  const topMenuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: 'Home',
      onClick: () => router.push('/'),
    },
    {
      key: 'products',
      label: 'Products',
      onClick: () => router.push('/products'),
    },
    {
      key: 'attributes',
      label: 'Attributes',
      onClick: () => router.push('/attributes'),
    },
  ];

  // Side navigation menu
  const sideMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <HomeOutlined />,
      onClick: () => router.push('/'),
    },
    {
      key: 'products',
      label: 'Products',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'product-list',
          label: 'Product List',
          onClick: () => router.push('/products'),
        },
        {
          key: 'add-product',
          label: 'Add Product',
          onClick: () => router.push('/products/add'),
        },
      ],
    },
    {
      key: 'attributes',
      label: 'Attributes',
      icon: <NotificationOutlined />,
      onClick: () => router.push('/attributes'),
    },
    {
      key: 'vendors',
      label: 'Vendors',
      icon: <UserOutlined />,
      onClick: () => router.push('/vendors'),
    },
    {
      key: 'operators',
      label: 'Operators',
      icon: <UserOutlined />,
      onClick: () => router.push('/operators'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', position: 'relative' }}>
        <div className="demo-logo" style={{ 
          width: '120px', 
          height: '32px', 
          background: 'rgba(255, 255, 255, 0.2)', 
          marginRight: '24px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
        >  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold'}}>{logoName}</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname === '/' ? 'home' : pathname.split('/')[1] || 'home']}
          items={topMenuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      
      <Layout>
        <Sider 
          style={{ background: colorBgContainer }} 
          width={250}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname === '/' ? 'dashboard' : pathname.split('/')[1] || 'dashboard']}
            defaultOpenKeys={['products']}
            style={{ height: '100%', borderRight: 0 }}
            items={sideMenuItems}
          />
        </Sider>
        
        <Layout style={{ padding: '24px' }}>
          <Content style={{ 
            padding: '24px', 
            margin: 0, 
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>
      
      <Footer style={{ textAlign: 'center', padding: '16px 24px' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppLayout;