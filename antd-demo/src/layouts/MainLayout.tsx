// MainLayout.tsx
import React, { ReactNode } from 'react'

// import Header from "../components/Header"
// import Footer from '../components/Header';

// imports de AntDesign
import { Layout, Space } from 'antd'
import { Link, Outlet } from 'react-router-dom'
const { Header, Footer, Content } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#EE651D',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  fontWeight: 800,
  backgroundColor: '#FDBF6F',
  fontSize: '1.5rem',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#EE651D',
  backgroundColor: '#fff',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#EE651D',
  backgroundColor: '#FDBF6F',
}

const MainLayout: React.FC = ({}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Link to={'/'}>Morbibike</Link>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          © 2023 Morbibike • Tous droits réservés
        </Footer>
      </Layout>
    </Space>
  )
}

export default MainLayout
