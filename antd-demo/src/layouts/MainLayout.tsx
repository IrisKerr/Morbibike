import React from 'react'
import { Layout, Space } from 'antd'
import { Outlet } from 'react-router-dom'
import SuperModal from '../modules/super-modal/SuperModal'
import Navbar from '../containers/Navbar'

const { Footer, Content } = Layout

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '86vh',
  lineHeight: '120px',
  color: 'white',
  backgroundColor: '#f2f0e5dc',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.8rem',
  backgroundColor: '#f2f0e5',
  color: '#212424b5',
}

export const MainLayout = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: '100%', padding: '0' }}
      size={[0, 48]}
    >
      <Layout>
        <Navbar />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          © 2024 IrisKerr • Tous droits réservés
        </Footer>
        <SuperModal />
      </Layout>
    </Space>
  )
}

export default MainLayout
